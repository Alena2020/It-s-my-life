"use strict";

const travelTitle = document.getElementById('travelTitle');
const country = document.getElementById('country');
const city = document.getElementById('city');
const purpose = document.getElementById('purpose');
const address = document.getElementById('address');
const homeAddress = document.getElementById('homeAddress');
const travelDate = document.getElementById('travelDate');
const travelBackDate = document.getElementById('travelBackDate');
const travelComment = document.getElementById('travelComment');
const travelButton = document.getElementById('travelButton');
const travels= document.getElementById('travelsRow');

let travelsList = [];
let travel = {
  title: '',
  country: '',
  city: '',
  purpose: '',
  address: '',
  homeAddress: '',
  date: '',
  dateBack: '',  
  comment: '',
  checked: ''
};

function loadLocalStorageForTravels() {
  if (localStorage.getItem("travels")) {
    travelsList = JSON.parse(localStorage.getItem("travels")) || [];
    renderTravels();
  }
}

loadLocalStorageForTravels();

function updateLocalStorageForTravels() {
  localStorage.setItem("travels", JSON.stringify(travelsList));  
}

function addTravel(newTravel) {
  if (travelTitle.value !== '' && city.value !== '' && purpose.value !== '') {
    travel = {...newTravel};
    travelsList.push(travel);
    renderTravels();
    updateLocalStorageForTravels();
  }  
}

function renderTravels() {
  let travelTemplate = '';

  travelsList.forEach(function(item, index) {

  travelTitle.value = '';
  country.value = '';
  city.value = '';
  purpose.value = '';
  address.value = '';
  homeAddress.value = '';
  travelDate.value = '';
  travelBackDate.value = '';  
  travelComment.value = '';

    travelTemplate += `
        <div class="col-lg-4 col-md-6 py-3 text-primary mb-3 border-info">
          <div class="card h-100 border-info">
            <div class="card-body">              
              <h4 class="card-title">${item.title}</h4>
              <p class="col-md-12 fw-bolder">Country: ${item.country}</p> 
              <p class="col-md-12 fw-bolder">City: ${item.city}</p>
              <p class="col-md-12 fw-bolder">Purpose: ${item.purpose}</p>
              <p class="col-md-12 fw-bolder">Place: ${item.address}</p> 
              <p class="col-md-12 fw-bolder">Housing address: ${item.homeAddress}</p> 
              <p class="col-md-12 fw-bolder">Travel date": ${item.date}</p>                 
              <p class="col-md-12 fw-bolder">Return date: ${item.dateBack}</p> 
              <p class="col-md-12 fw-bolder">Comment: ${item.comment}</p>            
              <div class="row g-0 d-flex align-items-center">
                <div class="form-check col-md-8">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"  onclick="checkedTravel(${index})" ${item.checked ? 'checked' : ''}>
                  <label class="form-check-label" for="flexCheckDefault">Visited</label>
                </div>                
                <button type="button" class="btn btn-primary col-md-4"  onclick="removeTravel(${index})">Remove</button>
              </div>              
            </div>
          </div>
        </div>
    `;
  });

  travels.innerHTML = travelTemplate; 
}

function checkedTravel(index) {
  travelsList[index].checked = !travelsList[index].checked;
  renderTravels();
  updateLocalStorageForTravels();
}

function removeTravel(index) {
  travelsList.splice(index, 1);
  renderTravels();
  updateLocalStorageForTravels();
  
  return this.parentNode.remove();
}

travelButton.addEventListener('click', (event)=> {
  event.preventDefault();

  addTravel({
  title: travelTitle.value,
  country: country.value,
  city: city.value,
  purpose: purpose.value,
  address: address.value,
  homeAddress: homeAddress.value,
  date: travelDate.value,
  dateBack: travelBackDate.value,  
  comment: travelComment.value,
  checked: false
  });
});