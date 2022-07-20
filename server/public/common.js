logout_button=document.getElementById('logout')
home_button=document.getElementById('home')

logout_button.addEventListener('click',()=>{
  localStorage.clear()
  window.location.href="index.html"
})

home_button.addEventListener('click',()=>{
    window.location.href="dashboard.html"
})

