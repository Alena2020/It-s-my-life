"use strict";

const taskTitle = document.getElementById('taskTitle');
const taskDate = document.getElementById('taskDate');
const taskButton = document.getElementById('taskButton');
const tasks = document.getElementById('tasksRow');

let toDoList = [];
let task = {
  title: '',
  date: '',
  checked: ''
};

function loadLocalStorageForTasks() {
    if (localStorage.getItem("tasks")) {
        toDoList = JSON.parse(localStorage.getItem("tasks")) || [];
        renderTasks();
    }
}

loadLocalStorageForTasks();

function updateLocalStorageForTasks() {
    localStorage.setItem("tasks", JSON.stringify(toDoList));
}

function addTask(newTask) {
  if (taskTitle.value !== '' && taskDate.value !== '') {
      task = {...newTask}; 
      toDoList.push(task);
      renderTasks();
      updateLocalStorageForTasks();
  }
}

function renderTasks() {
  let taskTemplate = '';

  toDoList.forEach(function(item, index) {

    taskTitle.value = '';        
    taskDate.value = '';

    taskTemplate += `
        <div class="col-lg-4 col-md-6 py-3 text-primary mb-3 border-info">
          <div class="card h-100 border-info">
            <div class="card-body">              
              <h4 class="card-title">${item.title}</h4>
              <p class="col-md-4 fw-bolder">${item.date}</p>              
              <div class="row g-0 d-flex align-items-center">
                <div class="form-check col-md-8">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"  onclick="checkedTask(${index})" ${item.checked ? 'checked' : ''}>
                  <label class="form-check-label" for="flexCheckDefault">Task is done</label>
                </div>                
                <button type="button" class="btn btn-primary col-md-4"  onclick="removeTask(${index})">Remove</button>
              </div>              
            </div>
          </div>
        </div>
    `;
  });

    tasks.innerHTML = taskTemplate;  
}

function removeTask(index) {
    toDoList.splice(index, 1);
    updateLocalStorageForTasks();
    renderTasks();
    
    return this.parentNode.remove();
}

function checkedTask(index) {
    toDoList[index].checked = !toDoList[index].checked;
    updateLocalStorageForTasks();
    renderTasks();
}

taskButton.addEventListener('click', (event)=> {
  event.preventDefault();

  addTask({title: taskTitle.value, date: taskDate.value, checked: false});
});