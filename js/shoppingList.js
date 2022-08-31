"use strict";

const productTitle = document.getElementById('productTitle');
const products = document.getElementById('productsRow');
const productButton = document.getElementById('productButton');

let shoppingList = [];
let product = {
  title: '',
  checked: ''
};

function loadLocalStorageForProducts() {
    if (localStorage.getItem("products")) {
        shoppingList = JSON.parse(localStorage.getItem("products")) || [];
        renderProducts();
    }
}

loadLocalStorageForProducts();

function updateLocalStorageForProducts() {
    localStorage.setItem("products", JSON.stringify(shoppingList));
}

function addProduct(newProduct) {
  if (productTitle.value !== '') {
      product = {...newProduct}; 
      shoppingList.push(product);
      renderProducts();
      updateLocalStorageForProducts();
  }
}

function renderProducts() {
  let productTemplate = '';

  shoppingList.forEach(function(item, index) {

    productTitle.value = '';

    productTemplate += `
        <div class="col-lg-4 col-md-6 py-3 text-primary mb-3">
          <div class="card h-100 border-info">
            <div class="card-body d-flex justify-content-around align-items-center">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onclick="checkedProduct(${index})" ${item.checked ? 'checked' : ''}>
                <label class="form-check-label" for="flexCheckDefault"></label>
              </div>
              <h4 class="card-title">${item.title}</h4> 
              <button type="button" class="btn btn-primary col-md-4"  onclick="removeProduct(${index})">Remove</button>             
            </div>
          </div>
        </div>
    `;
  });

    products.innerHTML = productTemplate;  
}

function removeProduct(index) {
    shoppingList.splice(index, 1);
    renderProducts();
    updateLocalStorageForProducts();
    
    return this.parentNode.remove();
}

function checkedProduct(index) {
    shoppingList[index].checked = !shoppingList[index].checked;
    renderProducts();
    updateLocalStorageForProducts();
}


productButton.addEventListener('click', (event) => {
  event.preventDefault();

  addProduct({title: productTitle.value, checked: false});
});