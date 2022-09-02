"use strict";

const dreamTitle = document.getElementById('dreamTitle');
const dreamComment = document.getElementById('dreamComment');
const dreams = document.getElementById('dreamsRow');
const dreamButton = document.getElementById('dreamButton');

let dreamsList = [];
let dream = {
  title: '',
  comment: '',
  checked: ''
};

function loadLocalStorageForDreams() {
  if (localStorage.getItem("dreams")) {
    dreamsList = JSON.parse(localStorage.getItem("dreams")) || [];
    renderDreams();
  }  
}

loadLocalStorageForDreams();

function updateLocalStorageForDreams() {
  localStorage.setItem("dreams", JSON.stringify(dreamsList));
}

function addDream(newDream) {
  if (dreamTitle.value !== '' && dreamComment.value !== '') {
    dream = {...newDream};
    dreamsList.push(dream);
    renderDreams();
    updateLocalStorageForDreams();
  }
}

function renderDreams() {
  let dreamTemplate = '';

  dreamsList.forEach(function(item, index) {

    dreamTitle.value = '';        
    dreamComment.value = '';

    dreamTemplate += `
        <div class="col-lg-4 col-md-6 py-3 text-primary mb-3">
          <div class="card h-100 border-info">
            <div class="card-body">
              <h4 class="card-title">${item.title}</h4>
              <p>Comment: ${item.comment}</p>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onclick="checkedDream(${index})" ${item.checked ? 'checked' : ''}>
                <label class="form-check-label" for="flexCheckDefault">💎 Dream come true 💎</label>
              </div>
            </div>
          </div>
        </div>
    `;
  });

    dreams.innerHTML = dreamTemplate;  
}

function checkedDream(index) {
  dreamsList[index].checked = !dreamsList[index].checked;
  renderDreams();
  updateLocalStorageForDreams();
}

dreamButton.addEventListener('click', (event) => {
  event.preventDefault();

  addDream({title: dreamTitle.value, comment: dreamComment.value , checked: false});
});