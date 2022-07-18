
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
let confirm_field=document.getElementById('confirm')

let name_field=document.getElementById('name')
let phone_field=document.getElementById('phone')
let address_field=document.getElementById('address')


signup_toggle.addEventListener('click',()=>{
  login_form.style.display="none"
  signup_form.style.display=""
  signup_toggle.style.background="linear-gradient(to right, #D86997,#F2C14E)"
  login_toggle.style.background="transparent"
  refreshFields()
})

login_toggle.addEventListener('click',()=>{
  signup_form.style.display="none"
  login_form.style.display=""
  login_toggle.style.background="linear-gradient(to right, #D86997,#F2C14E)"
  signup_toggle.style.background="transparent"
  refreshFields()
})

login_button.addEventListener('click',async(e)=>{
  e.preventDefault()
  const username=userid_field.value.trim()
  const password=password_field.value.trim()

  const data={
    "username":username,
    "password":password
  }
  try{
    const loginResponse=await logIn(data)
    if(loginResponse.success===true){
      localStorage.setItem("token",loginResponse.token)
      window.location.href="dashboard.html"
    }
    else{
      console.log('error')
    }  
  }catch(error){
    console.log(error)
  } 
})

signup_button.addEventListener('click',async(e)=>{
  e.preventDefault()
  const username=signup_userid_field.value.trim()
  const password=signup_password_field.value.trim()
  const name=name_field.value.trim()
  const address=address_field.value.trim()
  const phone=phone_field.value.trim()
  const email=email_field.value.trim()
  const confirm=confirm_field.value.trim()
  console.log(confirm)
  const data={
    "username":username,
    "password":password,
    "name":name,
    "email":email,
    "phone":phone,
    "address":address
  }

  if(confirm!==password){
    console.log('pblm')
    refreshFields()
    return
  }
  try{
    const signupResponse=await signUp(data)
    if(signupResponse.success===true){
      console.log('success')
      signup_form.style.display="none"
      login_form.style.display=""
      login_toggle.style.background="linear-gradient(to right, #D86997,#F2C14E)"
      signup_toggle.style.background="transparent"
      refreshFields()
    }
    else{
      refreshFields()
    }
  }
  catch(error){
    console.log(error)
  }
})

const signUp=async (contents)=>{
  try{
    const response=await fetch('/userlogin/sign_up',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(contents)
    }).then(async response=>{
      if(response.ok){
        response.json().then(json=>resolve(json))
      }
      else{
        response.json().then(json=>reject(json))
      }
    }).catch(async error=>{
      reject(error)
    })
  }
  catch(err){
    console.log(err)
  }
}

const logIn=async(contents)=>{
  try{
    const response=await fetch('/userlogin/sign_in',{
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
  if(signup_userid_field.value) signup_userid_field.value=''
  if(signup_password_field) signup_password_field.value=''
  if(email_field) email_field.value=''
  if(confirm_field) confirm_field.value=''
  if(userid_field) userid_field.value=''
  if(password_field) password_field.value=''
  if(name_field) name_field.value=''
  if(address_field) address_field.value=''
  if(phone_field) phone_field.value=''
}

const begin=()=>{
  refreshFields()
  checkLocalStorage()
}

window.onload=begin()
