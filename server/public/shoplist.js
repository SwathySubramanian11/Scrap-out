let boxContainer=document.getElementById('box-container')
let box=document.getElementsByClassName('box')

let token=null
let params=null
let current_category=null

const addEventListenerForBoxes=()=>{
  for(let i=0;i<box.length;i++){
    box[i].addEventListener('click',()=>{
      const url=new URL(`http://localhost:5000/shop.html?category=${current_category}`)
      url.searchParams.delete('id')
      url.searchParams.append('id',box[i].id)
      const newUrl=url.toString()
      window.location.href=newUrl
    })
  }
}

const renderData=(shop,shopInfo)=>{
  let productNode=''

  for(let i=0;i<shop[current_category].length;i++){

    let current_subCategory=shop[current_category][i]
    let subCategory=Object.keys(current_subCategory)[0]
    let price=current_subCategory[subCategory]
    
    productNode+=`<li>${subCategory} ${price}/kg</li>`
  }
  
  let boxNode=`
      <div class="box" id="${shop._id}">
        <img src="images/shopPic.jpeg" alt=""/>
        <ul class="shop-details">
            <li><h3>${shopInfo.shopname}</h3></li>
            <li>${current_category}</li>
            ${productNode}
            <li>Rating</li>
            <li>${shopInfo.address}</li>
        </ul>
      </div>
  `
  boxContainer.innerHTML+=boxNode
  
}

const clickingCategoryToShop=async()=>{
  try{
    let response=await getSelectedProduct({selected:params.get('category')},token)
    if(response.success===false && response.message==='invalid token')
      window.location.href="index.html"

    for(let shop=0;shop<response.length;shop++){
      try{
        let shopInfo=await getCollectorAccount({collector:response[shop].shopname},token)
        renderData(response[shop],shopInfo)
        addEventListenerForBoxes()
      }catch(error){
        console.log(error)
      }
    }
  }catch(error){
    console.log(error)
  }
}

const checkLocalStorage=()=>{
  token=localStorage.getItem("token")
  if(!token){
    window.location.href="index.html"
  }
  params=new URLSearchParams(window.location.search)
  current_category=params.get('category')
  clickingCategoryToShop()
}

const getCollectorAccount=async (contents,token)=>{
  try{
    const response=await fetch('/user/get_collectors',{
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

const getSelectedProduct=async(contents,token)=>{
  try{
    const response=await fetch('/user/get_selected_product',{
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
