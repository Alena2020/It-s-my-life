"use strict";

const filmTitle = document.getElementById('filmTitle');
const filmComment = document.getElementById('filmComment');
const films = document.getElementById('filmsRow');
const filmButton = document.getElementById('filmButton');

let filmsList = [];
let film = {
  title: '',
  comment: ''
};

function loadLocalStorage() {
    if (localStorage.getItem("films")) {
        filmsList = JSON.parse(localStorage.getItem("films")) || [];
        render();
    }
}

loadLocalStorage();

function updateLocalStorage() {
    localStorage.setItem("films", JSON.stringify(filmsList));
}

function addFilm(newFilm) {
  if (filmTitle.value !== '' && filmComment.value !== '') {
      film = {...newFilm}; 
      filmsList.push(film);
      render();
      updateLocalStorage();
  }
}

function render() {
  let filmTemplate = '';

  filmsList.forEach(function(item, index) {

    filmTitle.value = '';        
    filmComment.value = '';

    filmTemplate += `
        <div class="col-lg-4 col-md-6 py-3">
          <div class="card h-100">
            <div class="card-body">
              <h4 class="card-title">${item.title}</h4>
              <p>${item.comment}</p>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">Film viewed</label>
              </div>
            </div>
          </div>
        </div>
    `;
  });

    films.innerHTML = filmTemplate;  
}


filmButton.addEventListener('click', (event) => {
  event.preventDefault();

  addFilm({title: filmTitle.value, comment: filmComment.value});
});

