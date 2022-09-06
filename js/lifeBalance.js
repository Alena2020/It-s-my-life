"use strict";

const spheresOfLife = document.getElementById('spheresOfLifeRow');
const saveButton = document.getElementById('saveButton');
let inputObjectives; 
let inputRate; 
let lifeBalance = [
        {title: "Friends", objectives: '', image: 'img/LifeBalance/Friends.webp', rating:''},
        {title: "Family", objectives: '', image: 'img/LifeBalance/Family.jpg', rating:''},
        {title: "House", objectives: '', image: 'img/LifeBalance/House.jpg', rating:''},
        {title: "Travelling", objectives: '', image: 'img/LifeBalance/Travelling.jpg', rating:''},
        {title: "Hobby", objectives: '', image: 'img/LifeBalance/Hobby.jpg', rating:''},
        {title: "Happiness", objectives: '', image: 'img/LifeBalance/Happiness.jpg', rating:''},
        {title: "Lifestyle", objectives: '', image: 'img/LifeBalance/Lifestyle.jpg', rating:''},
        {title: "Sports", objectives: '', image: 'img/LifeBalance/Sports.jpg', rating:''},
        {title: "Health", objectives: '', image: 'img/LifeBalance/Health.jpg', rating:''},
        {title: "Work", objectives: '', image: 'img/LifeBalance/Work.jpg', rating:''},
        {title: "Skills", objectives: '', image: 'img/LifeBalance/Skills.png', rating:''},
        {title: "Finance", objectives: '', image: 'img/LifeBalance/Finance.jpg', rating:''}
];

console.log(lifeBalance);

function loadLocalStorageForLifeBalance() {
  if (localStorage.getItem("spheresOfLife")) {
    lifeBalance = JSON.parse(localStorage.getItem("spheresOfLife"));    
  } else {
    updateLocalStorageForLifeBalance();
  }
  renderLifeBalance();
}

loadLocalStorageForLifeBalance();

function updateLocalStorageForLifeBalance() {
  localStorage.setItem("spheresOfLife", JSON.stringify(lifeBalance));
}

function renderLifeBalance() {
  let lifeBalanceTemplate = '';

  lifeBalance.forEach(function(item, index) {

    lifeBalanceTemplate  += `
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-heading${item.title}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${item.title}" aria-expanded="false" aria-controls="flush-collapse${item.title}">
              ${item.title}
            </button>
          </h2>
          <div id="flush-collapse${item.title}" class="accordion-collapse collapse" aria-labelledby="flush-heading${item.title}" data-bs-parent="#spheresOfLifeRow">
            <div class="accordion-body">
                <div class="card mb-3 text-center">
                  <img src="${item.image}" class="card-img-top w-50 rounded mx-auto d-block" alt="${item.title}">
                  <div class="card-body">
                    <h5 class="card-title">What is the objectives of your life?</h5>
                    <div class="input-group">
                      <span class="input-group-text w-100">You objectives:</span>
                      <textarea class="form-control"  placeholder="Write You objectives" aria-label="You objectives" id="${index}" >${item.objectives}</textarea>
                    </div>
                    <div class="input-group mb-3">
                      <label class="input-group-text w-100" for="inputGroupSelect${item.title}">Rate the ${item.title}</label>
                      <select class="form-select" id="inputGroupSelect${item.title}">
                        <option selected>${item.rating}</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>
                </div>            
            </div>
          </div>
        </div>

    `;

    spheresOfLife.innerHTML = lifeBalanceTemplate;
  });
}

function updateLifeBalance() {
  inputObjectives = document.querySelectorAll('textarea');
  inputRate = document.querySelectorAll('select'); 

  for (let index = 0; index < lifeBalance.length; index++) {
    lifeBalance[index].objectives = inputObjectives[index].value;
    lifeBalance[index].rating = inputRate[index].value;
  }

  updateLocalStorageForLifeBalance(); 
}

saveButton.addEventListener('click', () => {
  updateLifeBalance();
});