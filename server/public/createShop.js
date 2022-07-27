let paper_btn=document.getElementById('paper-btn');
let e_waste_btn=document.getElementById('e-waste-btn');
let plastic_btn=document.getElementById('plastic-btn');
let metal_btn=document.getElementById('metal-btn');
let other_btn=document.getElementById('other-btn');
let add_item_paper_btn=document.getElementById('add-item-paper');
let add_item_e_waste_btn=document.getElementById('add-item-e-waste');
let add_item_plastic_btn=document.getElementById('add-item-plastic');
let add_item_metal_btn=document.getElementById('add-item-metal');
let add_item_other_btn=document.getElementById('add-item-other');

let add_item_paper_tag=document.getElementById('add-item-paper-tag');
let add_item_e_waste_tag=document.getElementById('add-item-e-waste-tag');
let add_item_plastic_tag=document.getElementById('add-item-plastic-tag');
let add_item_metal_tag=document.getElementById('add-item-metal-tag');
let add_item_other_tag=document.getElementById('add-item-other-tag');


let paper_div=document.getElementById('paper-div');
let e_waste_div=document.getElementById('e-waste-div');
let plastic_div=document.getElementById('plastic-div');
let metal_div=document.getElementById('metal-div');
let other_div=document.getElementById('other-div');

let add_icon=document.getElementsByClassName('material-symbols-outlined');
let save_btn=document.getElementById('save-btn');


for(let i=0;i<add_icon.length;i++){
    add_icon[i].addEventListener('click',()=>{
        console.log(add_icon[i]);
        let newNode=`
        <div class="item-field">
            <input class="item-name-field" placeholder="Product">
            <input class="price-field" placeholder="Price (per kg)">
            <span class="material-symbols-outlined" id="add-icon">add_circle</span>
        </div>
      `
      add_icon[i].parentNode.parentNode.innerHTML+=newNode
    })
}

paper_btn.addEventListener('click',()=>{
    paper_div.style.display=""
})
e_waste_btn.addEventListener('click',()=>{
    e_waste_div.style.display=""
})
plastic_btn.addEventListener('click',()=>{
    plastic_div.style.display=""
})
metal_btn.addEventListener('click',()=>{
    metal_div.style.display=""
})
other_btn.addEventListener('click',()=>{
    other_div.style.display=""
})

add_item_paper_btn.addEventListener('click',()=>{
    //add_item_other_tag.style.display=""
    setTimeout(() => {
      paper_div.style.display="none"  
    }, 1000);
})

add_item_e_waste_btn.addEventListener('click',()=>{
    e_waste_div.style.display="none"
})

add_item_plastic_btn.addEventListener('click',()=>{
    plastic_div.style.display="none"
})

add_item_metal_btn.addEventListener('click',()=>{
    metal_div.style.display="none"
})

add_item_other_btn.addEventListener('click',()=>{
    other_div.style.display="none"
})

save_btn.addEventListener('click',()=>{
    //const checkLocalStorage=async ()=>{
        localStorage.setItem("created",true)
        window.location.href="cAcnt.html"
     // }
})
