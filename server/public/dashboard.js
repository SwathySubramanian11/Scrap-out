let logout_button=document.getElementById('logout')
let category=document.getElementsByClassName('category')
let container_wrapper=document.getElementById('container-wrapper')

let token=null

logout_button.addEventListener('click',()=>{
  localStorage.clear()
  window.location.href="index.html"
})

for(let categ=0;categ<category.length;categ++){
  category[categ].addEventListener('click',()=>{
    let current_category=category[categ].id
    const url=new URL('http://localhost:5000/shoplist.html')
    url.searchParams.delete('category')
    url.searchParams.append('category',current_category)
    const newUrl=url.toString()
    window.location.href=newUrl
  })
}


const checkLocalStorage=()=>{
  token=localStorage.getItem('token')
  if(!token){
    window.location.href="index.html"
  }
}

window.onload=checkLocalStorage()