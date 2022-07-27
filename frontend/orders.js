let accept_btn=document.getElementById('accept-btn');
let deny_btn=document.getElementById('deny-btn');
let to_be_cnfm_orders_div=document.getElementById('to-be-cnfm-orders');
let cnfrmed_orders_div=document.getElementsByClassName('confirmed-div')
let acnt_link=document.getElementById('acnt_link');

deny_btn.addEventListener('click',()=>{
    to_be_cnfm_orders_div.style.display="none"
})

accept_btn.addEventListener('click',()=>{
    to_be_cnfm_orders_div.parentNode
})

acnt_lin.addEventListener('click',()=>{
    window.location.href="cAcnt.html"
})
