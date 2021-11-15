"use strict";

const filmTitle = document.getElementById('filmTitle');
const filmComment = document.getElementById('filmComment');
const films = document.getElementById('filmsRow');
const filmButton = document.getElementById('filmButton');

filmButton.addEventListener('click', (event) => {
  event.preventDefault();

  if (filmTitle.value !== '' && filmComment.value !== '') {
    let filmTemplate = '';

    filmTemplate = `
        <div class="col-lg-4 col-md-6 py-3">
          <div class="card h-100">
            <div class="card-body">
              <h4 class="card-title">${filmTitle.value}</h4>
              <p>${filmComment.value}</p>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">Film viewed</label>
              </div>
            </div>
          </div>
        </div>
    `;

    films.innerHTML += filmTemplate;

    // Clear input
    filmTitle.value = '';        
    filmComment.value = '';
    
  }
});

