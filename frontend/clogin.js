let signup_button=document.getElementById('signup-button')
let login_button=document.getElementById('login-button')
let signup_form=document.getElementById('sign-up')
let login_form=document.getElementById('login')
let signup_toggle=document.getElementById('signup-toggle-btn')
let login_toggle=document.getElementById('login-toggle-btn')
let input_fields=document.getElementsByClassName('input-field')

let name_field=document.getElementById('name')
let userid_field=document.getElementById('user-id')
let password_field=document.getElementById('password')
let email_field=document.getElementById('email')
let address_field=document.getElementById('address')
let phone_field=document.getElementById('phone-no')
let signup_userid_field=document.getElementById('signup-user-id')
let signup_password_field=document.getElementById('signup-password')
let confirm_field=document.getElementById('confirm-field')


signup_toggle.addEventListener('click',()=>{
  login_form.style.display="none"
  signup_form.style.display=""
  signup_toggle.style.background="linear-gradient(to right, #cb69d8, #ffc6d9)"
  login_toggle.style.background="transparent"
  userid_field.value=''
  password_field.value=''
})

login_toggle.addEventListener('click',()=>{
  signup_form.style.display="none"
  login_form.style.display=""
  login_toggle.style.background="linear-gradient(to right, #cb69d8, #ffc6d9)"
  signup_toggle.style.background="transparent"
  refreshFields()
})

login_button.addEventListener('click',()=>{
  window.location.href="dashboard.html"
})

signup_button.addEventListener('click',()=>{
  signup_form.style.display="none"
  login_form.style.display=""
  login_toggle.style.background="linear-gradient(to right, #cb69d8, #ffc6d9)"
  signup_toggle.style.background="transparent"
  refreshFields()
})

const refreshFields=()=>{
  if(signup_userid_field.value) signup_userid_field.value=''
  if(signup_password_field.value) signup_password_field.value=''
  if(name_field.value) name_field.value=''
  if(email_field.value) email_field.value=''
  if(confirm_field.value) confirm_field.value=''
  if(userid_field.value) userid_field.value=''
  if(password_field.value) password_field.value=''
  if(address_field.value) address_field.value=''
  if(phone_field.value) phone_field.value=''
}