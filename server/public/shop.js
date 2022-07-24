viewCartButton=document.getElementById('button-cart')
containerInfo=document.getElementById('container-info')
shopnameTag=document.getElementById('shopname-tag')
subProducts=document.getElementsByClassName('sub-products')
productWrapper=document.getElementById('product-wrapper')

let token=''
let current_id=''
let current_category=''

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

const renderData=(shop,shopProducts)=>{
  shopnameTag.innerHTML=shop.shopname

  console.log(shopProducts)

  let subProductNode=(category)=>{
    let node=''
    for(let subCategory in shopProducts[category]){
      let current=shopProducts[category][subCategory]
      let current_sub=Object.keys(current)
      node+=`
        <div class="product">
          <p id="item-title" class="item-title" >${current_sub}
            <span class="item-title">₹ ${current[current_sub]}/kg</span>
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
        </div>             
        <div class="sub-products" style="display:${display}">
          ${subProductNode(category)}
        </div>
      </div>
    `
    productWrapper.innerHTML+=productCategoryNode
  }

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


window.onload=checkLocalStorage()