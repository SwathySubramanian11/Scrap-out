
viewCartButton=document.getElementById('button-cart')
containerInfo=document.getElementById('container-info')
shopnameTag=document.getElementById('shopname-tag')
subProducts=document.getElementsByClassName('sub-products')
productWrapper=document.getElementById('product-wrapper')
expandMore=document.getElementsByClassName('expand_more')
expandLess=document.getElementsByClassName('expand_less')
categoryHead=document.getElementsByClassName('category-head')
expand=document.getElementsByClassName('material-symbols-outlined')
addButton=document.getElementsByClassName('button-add')
buttonCart=document.getElementById('button-cart')

let token=''
let current_id=''
let current_category=''
let count=0
let Totalprice=0

//viewCartButton.addEventListener('click',()=>{
//  window.location.href="cart.html"
//})



const mapPicturesToCategory=(category)=>{
  switch(category){
    case 'E-Waste':
      return 'e_waste.jpeg'
    case 'Paper':
      return 'paper.png'
    case 'Plastic':
      return 'plastic.png'
    case 'Metal':
      return 'metal.png'
    case 'Glass':
      return 'glass.png'
    case 'Others':
      return 'trash.jpg'
  }
}

const updateViewCart=(count,price)=>{
  let countTag=productWrapper.lastElementChild.firstElementChild.firstElementChild
  countTag.innerHTML=`${count} Items selected`
  let priceTag=productWrapper.lastElementChild.firstElementChild.lastElementChild
  priceTag.innerHTML=`Maximum Reward: ₹ ${price}`
}

const EventListenerForAddButton=(shopname)=>{
  const getDirectInnerText=(element)=>{
    var childNodes = element.childNodes;
    result = '';
    for (var i = 0; i < childNodes.length; i++) {
      if(childNodes[i].nodeType == 3) {
        return childNodes[i].data;
      }
    }
  
  }

  for(let i=0;i<addButton.length;i++){
    addButton[i].addEventListener('click',async()=>{
      let category=getDirectInnerText(addButton[i].parentNode.firstElementChild)
      category=category.trim()
      let price=addButton[i].parentNode.firstElementChild.firstElementChild.textContent.split(' ')
      price=price[1]
      let contents={
        category:category,
        price:price,
        shopname:shopname
      }
      console.log(contents)
      try{
        response=await addOrEditItem(contents,token)
        if(response.success===true){
          addButton[i].innerHTML='Added!'
          count++
          updateViewCart(count,price)
        }
      }catch(error){
        console.log(error)
      }
    })
  }
}

const expandToggle=()=>{

  for(let i=0;i<expand.length;i++){
    //console.log(expand[i])
    expand[i].addEventListener('click',()=>{
      let subProductElement=expand[i].parentNode.parentNode.lastElementChild
      if(expand[i].innerHTML==='expand_less'){
        subProductElement.style.display="none"
        expand[i].innerHTML='expand_more'
        expand[i].className='material-symbols-outlined expand_more'
        
      }
      else if(expand[i].innerHTML==='expand_more'){
        subProductElement.style.display=""
        expand[i].innerHTML='expand_less'
        expand[i].className='material-symbols-outlined expand_less'
        
      }
    })
  }

}

const renderData=async(shop,shopProducts)=>{
  shopnameTag.innerHTML=shop.shopname
  alreadyOrdered=await getOrderDetails(token)
  console.log(alreadyOrdered)
  count=alreadyOrdered.items.length
  for(let i=0;i<alreadyOrdered.items.length;i++){
    let currentKey=alreadyOrdered.items[i].key
    Totalprice+=parseInt(alreadyOrdered.items[i][currentKey])
  }
  

  let subProductNode=(category)=>{
    let node=''
    for(let subCategory in shopProducts[category]){
      let current=shopProducts[category][subCategory]
      let current_sub=Object.keys(current)
      node+=`
        <div class="product">
          <p id="item-title" class="item-title" >${current_sub}
            <span class="item-title">₹ ${current[current_sub]} /kg</span>
          </p>
          <button class="button-add">Add</button>
        </div>
      `
    }
    
    return node
  }
  

  for(let category in shopProducts){
    let display="none"
    if(category==='shopname' || category==='_id' || category==='__v') continue
    if(category===current_category) display=""

    let productCategoryNode=`
      <div class="product-details">
        <div class="category-head">
          <div class="container-img">
            <img class="product-img" src="images/${mapPicturesToCategory(category)}">
          </div>
          <div class="product-text">
            <p id="${category}" class="item-title">${category}</p>
          </div>  
          <span class="material-symbols-outlined ${display==="none"? 'expand_more':'expand_less'}">${display==="none"? 'expand_more':'expand_less'}</span>
        </div>             
        <div class="sub-products" style="display:${display}">
          ${subProductNode(category)}
        </div>
      </div>
    `
    productWrapper.innerHTML+=productCategoryNode
  }
  productWrapper.innerHTML+=`
      <div class="product-details" id="product-cart">
        <div class="cart-details">
          <p>${count} Items selected</p>
          <p>Maximum Reward: ₹ ${Totalprice}</p>
        </div>
        <div class="button-container">
          <button id="button-cart">View cart</button>
        </div>
      </div>
  `
  productWrapper.lastElementChild.lastElementChild.lastElementChild.addEventListener('click',()=>{
    window.location.href="cart.html"
  })

  //expansionEventListener()
  expandToggle()
  EventListenerForAddButton(shop.shopname)
}

const checkLocalStorage=async()=>{
  token=localStorage.getItem("token")
  if(!token){
    window.location.href="index.html"
  }
  current_category=localStorage.getItem('current_category')
  current_id=localStorage.getItem('current_id')
  try{
    current_id=localStorage.getItem('current_id')
    let contents={id:current_id}
    let response=await getCollectorAccountAndProducts(contents,token)
    console.log(response)
    renderData(response[0],response[1])
  }catch(error){
    console.log(error)
  }
}

const getCollectorAccountAndProducts=async (contents,token)=>{
  try{
    const response=await fetch('/user/get_selected_collector',{
      method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        },
        body:JSON.stringify(contents)
    })
    const result=await response.json()
    return result
  }
  catch(e){
    console.log(e)
  }
}


const addOrEditItem=async (contents,token)=>{
  try{
    const response=await fetch('/user/post/edit_order',{
      method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        },
        body:JSON.stringify(contents)
    })
    const result=await response.json()
    console.log(result)
    return result
  }
  catch(e){
    console.log(e)
  }
}

const getOrderDetails=async (token)=>{
  try{
    const response=await fetch('/user/get_order',{
      method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        }
    })
    const result=await response.json()
    console.log(result)
    return result
  }
  catch(e){
    console.log(e)
  }
}
window.onload=checkLocalStorage()