cartContainer=document.getElementById('cart-container')
cartWrapper=document.getElementsByClassName('cart-wrapper')

let token=null

console.log(cartWrapper[0])
cartContainer=cartWrapper[0].firstElementChild

const renderData=async()=>{
  let Totalprice=0
  alreadyOrdered=await getOrderDetails(token)
  console.log(alreadyOrdered.items)

  for(let i=0;i<alreadyOrdered.items.length;i++){
    let currentKey=alreadyOrdered.items[i].key 
    let currentPrice=alreadyOrdered.items[i][currentKey]
    Totalprice+=parseInt(currentPrice)
    let productNode=''
    productNode=`
      <div class="product-details">
        <div class="container-img">
            <img class="product-img" src="images/paper.png">
        </div>
        <div class="product-text">
            <p id="item-title">${currentKey}</p>
            <p>Price:₹ ${currentPrice} /kg</p>
        </div>
      </div>
    `  
    cartContainer.innerHTML+=productNode
    
  }

  

  summaryNode=`
    <div class="product-details" id="product-cart">
      <div class="cart-details">
        <p>Grand Total: ${Totalprice} Rs</p>
      </div>
      <div class="button-container" id="bookSlot-container">
        <button class="button-cart">Book a slot</button>
      </div>
    </div>
  `
  cartContainer.innerHTML+=summaryNode

  let confirmNode=`
    <div class="placeOrder-container">
      <div class="cart-details">
          <label for="chooseDate">Choose your preffered date</label><br>
          <input type="date" id="chooseDate" name="date">
      </div>
      <div class="button-container" id="confirmOrder-container">
          <button class="button-cart" id="confirm-button">Confirm Order</button>
      </div>
    </div>
  `
  cartContainer.innerHTML+=confirmNode
  const confirmButton=document.getElementById('confirm-button')
  let date=document.getElementById('chooseDate')

  confirmButton.addEventListener('click',()=>{
    console.log(date.value)
  })

  
  console.log()
}

const checkLocalStorage=()=>{
  token=localStorage.getItem('token')
  if(token){
    renderData()
  }else{
    window.location.href="index.html"
  }
}

const getOrderDetails=async (token)=>{
  try{
    const response=await fetch('/user/get_order',{
      method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        }
    })
    const result=await response.json()
    console.log(result)
    return result
  }
  catch(e){
    console.log(e)
  }
}

window.onload=checkLocalStorage()