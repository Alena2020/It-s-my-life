"use strict";

const trackerTitle = document.getElementById('trackerTitle');
const trackerButton = document.getElementById('trackerButton');
const trackers = document.getElementById('trackersRow');

let taskTrackers = [];
let tracker = {
        title: '',    
        checkboxesInTracker: [
        { name: "Monday", checked: false},
        { name: "Tuesday", checked: false},
        { name: "Wednes­day", checked: false},
        { name: "Thursday", checked: false},
        { name: "Friday", checked: false},
        { name: "Saturday", checked: false},
        { name: "Sunday", checked: false},
        ],       
    };

function loadLocalStorageForTrackers() {
  if (localStorage.getItem("taskTrackers")) {
    taskTrackers = JSON.parse(localStorage.getItem("taskTrackers")) || [];
    renderTrackers();
  }      
}

loadLocalStorageForTrackers();

function updateLocalStorageForTrackers() {
  localStorage.setItem("taskTrackers", JSON.stringify(taskTrackers));
}

function addTracker(newTracker) {
  if (trackerTitle.value !== '') {
    tracker = {...newTracker};
    taskTrackers.push(tracker);
    renderTrackers();
    updateLocalStorageForTrackers();    
  }  
}

function  renderTrackers() {
  let trackerTemplate = '';

  taskTrackers.forEach(function(item, indexTracker) {
    trackerTitle.value = '';

    trackerTemplate += `
          <div class="card h-100 text-info mt-3 border-info">
            <div class="card-body d-flex flex-row flex-wrap justify-content-between">              
              <h4 class="card-title">${item.title}</h4> 
              <div class="d-flex flex-row flex-wrap">             
    `;

    item.checkboxesInTracker.forEach(function(elem, index) {

      trackerTemplate += `
      <div class="form-check d-flex flex-column align-items-center" >
        <label class="form-check-label" for="flexCheckDefault">${elem.name}</label>
        <input class="form-check-input" type="checkbox" style="width: 30px; height: 30px; margin: 5px;" value="" id="flexCheckDefault"  onclick="checkedTracker(${indexTracker}, ${index})" ${elem.checked ? 'checked' : ''}>        
      </div>
    `;
    });

        trackerTemplate += `
              </div>
              <button type="button" class="btn btn-primary col-md-2"  onclick="removeTracker(${indexTracker})">Remove</button>
            </div>
          </div>
    `;
  
  });

  trackers.innerHTML = trackerTemplate;  
}

function removeTracker(indexTracker) {
  taskTrackers.splice(indexTracker, 1)
  renderTrackers();
  updateLocalStorageForTrackers();

  return this.parentNode.remove();  
}

function checkedTracker(indexTracker, index) {
    taskTrackers[indexTracker].checkboxesInTracker[index].checked = !taskTrackers[indexTracker].checkboxesInTracker[index].checked;
    renderTrackers();
    updateLocalStorageForTrackers();
}

trackerButton.addEventListener('click', (event) => {
  event.preventDefault();

  addTracker({title: trackerTitle.value,    
        checkboxesInTracker: [
        { name: "Monday", checked: false},
        { name: "Tuesday", checked: false},
        { name: "Wednes­day", checked: false},
        { name: "Thursday", checked: false},
        { name: "Friday", checked: false},
        { name: "Saturday", checked: false},
        { name: "Sunday", checked: false},
        ],});
});