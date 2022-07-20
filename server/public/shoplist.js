let boxContainer=document.getElementById('box-container')

let token=null



const checkLocalStorage=()=>{
  token=localStorage.getItem("token")
  if(!token){
    window.location.href="index.html"
  }
  const params=new URLSearchParams(window.location.search)
  console.log(params.get('category'))
}

window.onload=checkLocalStorage()
