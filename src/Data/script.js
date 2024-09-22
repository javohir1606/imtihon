let currentSlide = 0;
let autoSlideInterval;

const moveSlide = (direction) => {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  const offset = -currentSlide * 100;

  document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
};

document.querySelector('.prev').addEventListener('click', () => {
  moveSlide(-1);
  resetAutoSlide();
});

document.querySelector('.next').addEventListener('click', () => {
  moveSlide(1);
  resetAutoSlide();
});

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => moveSlide(1), 3000);
};

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};

const resetAutoSlide = () => {
  stopAutoSlide();
  startAutoSlide();
};

startAutoSlide();


////////////////////////////
const menu = document.querySelector(".menu");
const box = document.querySelector(".box");
const row = document.querySelector(".row");
const btn = document.getElementsByClassName('btn')


import { categories, price, getProductById } from "./data.js";

const render = async () => {
  const data = await categories();
  menu.innerHTML = await data.map((item) => `
    <button class="btn font-normal text-[22px] text-[#33a0ff]" data-item="${item}">${item}</button>
  `).join("");
  renderData(data[0]);
  btn[0].style.color = "red"
  btn[0].style.borderBottom = "2px solid  red"
}
render();

const renderData = async (item) => {
  const data = await price(item);
  box.innerHTML = await data?.map((item) => `
    <div class="w-[300px] h-[px] shadow-xl bg-[#fff] rounded-[10px] p-[40px] hover:bg-slate-100">
             <img class="image w-[200px] h-[150px] rounded-[10px]" src="${item.image}" alt="">
      <h1 class="font-bold text-[#223263] w-[250px] mt-3">${item.title}</h1>
      <div class="flex items-center justify-between mt-3 gap-[10px]">
      <div class="flex items-center gap-[10px] mt-3">
      <p class="text-[] font-bold  line-through">${item.price}</p>
      <p class="text-[#7b649f] font-bold">${Math.round(item.price -(item.price / 100 *24))}$</p>
      <p class="font-semibold text-[15px] text-[red]">24%Off</p>
      </div>
        <button id='addToCart' class="bg-amber-600 hover:bg-white  py-[5px] px-[15px] text-[#fff] hover:text-amber-600     border-[3px] border-amber-600 font-bold rounded-[10px]" data-id="${item.id}">Shop</button>
      </div>
    </div>
  `).join("");
}

menu.addEventListener('click', (e) => {
  const data = e.target.dataset.item;
  if (data) {
    renderData(data);
    for (let i of btn) {
      i.style.color = ""
      i.style.borderBottom = ""
    }
    e.target.style.color = "blue"
    e.target.style.borderBottom = "3px solid red"
  }
});

let getArr = [];


const renderCart = () => {
  row.innerHTML = getArr.map((item) => `
    <div class="w-[300px] h-[px] shadow-xl bg-[#fff] rounded-[10px] p-[50px]">
      <img class="w-[200px] h-[150px]" src="${item.image}" alt="">
      <h1 class="font-bold text-[#223263] w-[250px] mt-3">${item.title}</h1>
      <div class="flex items-center gap-[10px] mt-3 w-[200px]">
        <p class="text-[#223263] font-bold">${item.price}</p>
        <p class="text-[#223263] font-bold">${item.rating.rate}</p>
        <p class="text-[red]">${Math.round(item.price / 100 * 24)}</p>
        <button class="bg-amber-600 py-[7px] px-[10px] rounded-[10px] text-[#fff] font-bold" data-id="${item.id}">Delet</button>
      </div>
    </div>
  `).join("") || "Savatcha bo'sh.";

  const totalPrice = getArr.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalElement = document.querySelector("#total-price");
  totalElement.textContent = `Total Price: ${totalPrice}$`;

  // const quantityElement = document.querySelector("#total-quantity");


}
const renderId = async (id, item) => {
  const data = await getProductById(id, item); 
  if (data) {
    const existingItem = getArr.find(cartItem => cartItem.id == data.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      data.quantity = 1;
      getArr.push(data);
    }
    localStorage.setItem("javohir", JSON.stringify(getArr));
    renderCart(); 
  } else {
    console.error("", data); 
  }
};


const deleteCard = (id) => {
  getArr = getArr.filter(item => item.id !== id);
  renderCart();
}

renderCart();

box.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (id) {
    renderId(id);
  }
});

row.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (id) {
    deleteCard(id);
  }
});



    const updateCartCount = () => {
      let cartItems = JSON.parse(localStorage.getItem('javohir')) || [];
  
      const totalItems = cartItems.length;
      document.querySelector('.totalEnd').textContent = totalItems;
    };
    
    updateCartCount();