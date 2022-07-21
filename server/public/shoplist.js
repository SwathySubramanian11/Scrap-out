let boxContainer=document.getElementById('box-container')


let token=null
let params=null

const renderData=(json)=>{
  let data=json
  console.log(data)
  for(let shop=0;shop<data.length;shop++){
    console.log(data[shop])
    let boxNode=`
        <div class="box" id="${data[shop].id}">
          <img src="images/shopPic.jpeg" alt=""/>
          <ul class="shop-details">
              <li><h3>${data[shop].shopname}</h3></li>
              <li>Price per kg</li>
              <li>Rating</li>
              <li>${data[shop].address}</li>
          </ul>
        </div>
    `
    boxContainer.innerHTML+=boxNode
  }
}

const checkLocalStorage=async()=>{
  token=localStorage.getItem("token")
  if(!token){
    window.location.href="index.html"
  }
  params=new URLSearchParams(window.location.search)
  console.log(params.get('category'))
  try{
    let response=await getSelectedProduct({selected:params.get('category')},token)
    console.log(response)
    for(let shop=0;shop<response.length;shop++){
      console.log(response[shop].shopname)
      try{
        let shopInfo=await getCollectorAccount({collector:response[shop].shopname},token)
        console.log(shopInfo)
      }catch(error){
        console.log(error)
      }
    }
  }catch(error){
    console.log(error)
  }
  
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
