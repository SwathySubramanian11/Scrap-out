let create_shop_button=document.getElementById('create-shop-button');
let shop_info=document.getElementById('shop-info-id');
let first_shop_info=document.getElementById('new-shop-info');
let order_link=document.getElementById('order-link');
let view_shop_button=document.getElementById('view-shop-button');

create_shop_button.addEventListener('click',()=>{
    console.log('Button clicked')
    //shop_info.style.display="none
})

order_link.addEventListener('click',()=>{
    window.location.href="orders.html"
})
const checkLocalStorage=async ()=>{
    created=localStorage.getItem('created')
    if(created){
        console.log("created")
      create_shop_button.style.display="none"
      view_shop_button.style.display=""

    }else{
        view_shop_button.style.display="none"
        create_shop_button.style.display=""
    }
  }
create_shop_button.addEventListener('click',()=>{
    window.location.href="createShop.html"
})

view_shop_button.addEventListener('click',()=>{
    window.location.href="cshop.html"
})