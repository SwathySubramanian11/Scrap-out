let signup_button=document.getElementById('signup-button')
let login_button=document.getElementById('login-button')
let signup_form=document.getElementById('sign-up')
let login_form=document.getElementById('login')
let signup_toggle=document.getElementById('signup-toggle-btn')
let login_toggle=document.getElementById('login-toggle-btn')
let input_fields=document.getElementsByClassName('input-field')

let userid_field=document.getElementById('user-id')
let password_field=document.getElementById('password')
let email_field=document.getElementById('email')
let signup_userid_field=document.getElementById('signup-user-id')
let signup_password_field=document.getElementById('signup-password')
let confirm_field=document.getElementById('confirm-field')


signup_toggle.addEventListener('click',()=>{
  login_form.style.display="none"
  signup_form.style.display=""
  signup_toggle.style.background="linear-gradient(to right, #D86997,#F2C14E)"
  login_toggle.style.background="transparent"
  userid_field.value=''
  password_field.value=''
})

login_toggle.addEventListener('click',()=>{
  signup_form.style.display="none"
  login_form.style.display=""
  login_toggle.style.background="linear-gradient(to right, #D86997,#F2C14E)"
  signup_toggle.style.background="transparent"
  signup_userid_field.value=''
  signup_password_field.value=''
  email_field.value=''
  confirm_field.value=''
})

login_button.addEventListener('click',()=>{
  window.location.href="dashboard.html"
})

signup_button.addEventListener('click',()=>{
  signup_form.style.display="none"
  login_form.style.display=""
  login_toggle.style.background="linear-gradient(to right, #D86997,#F2C14E)"
  signup_toggle.style.background="transparent"
  userid_field.value=''
  password_field.value=''
  email_field.value=''
  signup_password_field.value=''
  email_field.value=''
  confirm_field.value=''
})

const signUp=async (contents)=>{
  try{
      const response=await fetch('/sign_up',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
          },
          body:JSON.stringify(contents)
      })
      const result=await response.json()
      return result
  }
  catch(err){
      console.log(err)
  }
}

const signIn=async(contents)=>{
  try{
      const response=await fetch('/sign_in',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
          },
          body:JSON.stringify(contents)
      })
      const result=await response.json()
      return result
  }
  catch(err){
      console.log(err)
  }
}

const checkLocalStorage=async ()=>{
  token=localStorage.getItem("token")
  if(token){
      window.location.href="dashboard.html"
  }
}

const refreshFields=()=>{

}

const begin=()=>{
  refreshFields()
  checkLocalStorage()
}

window.onload=begin()
