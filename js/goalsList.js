"use strict";

const goalTitle = document.getElementById('goalTitle');
const goalDate = document.getElementById('goalDate');
const goalComment = document.getElementById('goalComment');
const goalButton = document.getElementById('goalButton');
const goals = document.getElementById('goalsRow');

let goalsList = [];
let goal = {
  title: '',
  date: '',
  comment: '',
  checked: ''
};

function loadLocalStorageForGoals() {
    if (localStorage.getItem("goals")) {
        goalsList = JSON.parse(localStorage.getItem("goals")) || [];
        renderGoals();
    }
}

loadLocalStorageForGoals();

function updateLocalStorageForGoals() {
    localStorage.setItem("goals", JSON.stringify(goalsList));
}

function addGoal(newGoal) {
  if (goalTitle.value !== '' && goalDate.value !== '') {
      goal = {...newGoal}; 
      goalsList.push(goal);
      renderGoals();
      updateLocalStorageForGoals();
  }
}

function renderGoals() {
  let goalTemplate = '';

  goalsList.forEach(function(item, index) {

    goalTitle.value = '';        
    goalDate.value = '';
    goalComment.value = '';

    goalTemplate += `
        <div class="col-lg-4 col-md-6 py-3 text-primary mb-3 border-info">
          <div class="card h-100 border-info">
            <div class="card-body">              
              <h4 class="card-title">${item.title}</h4>
              <p class="col-md-4 fw-bolder">${item.date}</p> 
              <p>Comment: ${item.comment}</p>
              <div class="row g-0 d-flex align-items-center">
                <div class="form-check col-md-8">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"  onclick="checkedGoal(${index})" ${item.checked ? 'checked' : ''}>
                  <label class="form-check-label" for="flexCheckDefault"></label>
                </div>                
                <button type="button" class="btn btn-primary col-md-4"  onclick="removeGoal(${index})">Remove</button>
              </div>              
            </div>
          </div>
        </div>
    `;
  });

    goals.innerHTML = goalTemplate;  
}

function removeGoal(index) {
    goalsList.splice(index, 1);
    updateLocalStorageForGoals();
    renderGoals();
    
    return this.parentNode.remove();
}

function checkedGoal(index) {
    goalsList[index].checked = !goalsList[index].checked;
    updateLocalStorageForGoals();
    renderGoals();
}

goalButton.addEventListener('click', (event)=> {
  event.preventDefault();

  addGoal({title: goalTitle.value, date: goalDate.value, comment: goalComment.value, checked: false});
});