logout_button=document.getElementById('logout')


logout_button.addEventListener('click',()=>{
  localStorage.clear()
  window.location.href="index.html"
})