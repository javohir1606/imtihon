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
    <div class="w-[300px] h-[px] shadow-xl bg-[#fff] rounded-[10px] p-[50px]">
      <img class="w-[200px] h-[150px]" src="${item.image}" alt="">
      <h1 class="font-bold text-[#223263] w-[250px] mt-3">${item.title}</h1>
      <div class="flex items-center gap-[10px] mt-3">
        <p class="text-[#223263] font-bold">${item.price}</p>
        <p class="text-[#223263] font-bold">${item.rating.rate}</p>
        <p class="text-[red]">${Math.round(item.price / 100 * 24)}</p>
        <button id='addToCart' class="bg-amber-600 py-[7px] px-[10px] rounded-[10px]" data-id="${item.id}">Add</button>
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
    e.target.style.color = "red"
    e.target.style.borderBottom = "3px solid red"
  }
});

let getArr = [];

const renderCart = () => {
  row.innerHTML = getArr.map((item) => `
    <div class="w-[300px] h-[px] shadow-xl bg-[#fff] rounded-[10px] p-[50px]">
      <img class="w-[200px] h-[150px]" src="${item.image}" alt="">
      <h1 class="font-bold text-[#223263] w-[250px] mt-3">${item.title}</h1>
      <div class="flex items-center gap-[10px] mt-3">
        <p class="text-[#223263] font-bold">${item.price}</p>
        <p class="text-[#223263] font-bold">${item.rating.rate}</p>
        <p class="text-[red]">${Math.round(item.price / 100 * 24)}</p>
        <button class="bg-amber-600 py-[7px] px-[10px] rounded-[10px]" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `).join("") || "Savatcha bo'sh.";

  localStorage.setItem("javohir", JSON.stringify(getArr));
}

const totalPrice = getArr.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalElement = document.querySelector("#total-price");
  totalElement.textContent = `Total Price: ${totalPrice}$`;

  const totalQuantity = getArr.reduce((total, item) => total + item.quantity, 0);
  const quantityElement = document.querySelector("#total-quantity");
  quantityElement.textContent = `Total Items: ${totalQuantity}`;


const renderId = async (id) => {
  const data = await getProductById(id); 
  if (!getArr.find(item => item.id === data.id)) { 
    getArr.push(data);
    renderCart(); 
  }
}

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
