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

function loadLocalStorageForFilms() {
    if (localStorage.getItem("films")) {
        filmsList = JSON.parse(localStorage.getItem("films")) || [];
        renderFilms();
    }
}

loadLocalStorageForFilms();

function updateLocalStorageForFilms() {
    localStorage.setItem("films", JSON.stringify(filmsList));
}

function addFilm(newFilm) {
  if (filmTitle.value !== '' && filmComment.value !== '') {
      film = {...newFilm}; 
      filmsList.push(film);
      renderFilms();
      updateLocalStorageForFilms();
  }
}

function renderFilms() {
  let filmTemplate = '';

  filmsList.forEach(function(item, index) {

    filmTitle.value = '';        
    filmComment.value = '';

    filmTemplate += `
        <div class="col-lg-4 col-md-6 py-3 text-primary mb-3">
          <div class="card h-100 border-info">
            <div class="card-body">
              <h4 class="card-title">${item.title}</h4>
              <p>${item.comment}</p>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onclick="checkedFilm(${index})" ${item.checked ? 'checked' : ''}>
                <label class="form-check-label" for="flexCheckDefault">Film viewed</label>
              </div>
            </div>
          </div>
        </div>
    `;
  });

    films.innerHTML = filmTemplate;  
}

function checkedFilm(index) {
    filmsList[index].checked = !filmsList[index].checked;
    renderFilms();
    updateLocalStorageForFilms();
}


filmButton.addEventListener('click', (event) => {
  event.preventDefault();

  addFilm({title: filmTitle.value, comment: filmComment.value});
});