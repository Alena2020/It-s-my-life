"use strict";

const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookComment = document.getElementById('bookComment');
const books = document.getElementById('booksRow');
const bookButton = document.getElementById('bookButton');

let booksList = [];
let book = {
  title: '',
  author: '',
  comment: '',
  checked: ''
};

function loadLocalStorageForBooks() {
    if (localStorage.getItem("books")) {
        booksList = JSON.parse(localStorage.getItem("books")) || [];
        renderBooks();
    }
}

loadLocalStorageForBooks();

function updateLocalStorageForBooks() {
    localStorage.setItem("books", JSON.stringify(booksList));
}

function addBook(newBook) {
  if (bookTitle.value !== '' && bookAuthor.value !== '' && bookComment.value !== '') {
      book = {...newBook}; 
      booksList.push(book);
      renderBooks();
      updateLocalStorageForBooks();
  }
}

function renderBooks() {
  let bookTemplate = '';

  booksList.forEach(function(item, index) {

    bookTitle.value = '';   
    bookAuthor.value = '';     
    bookComment.value = '';

    bookTemplate += `
        <div class="col-lg-4 col-md-6 py-3 text-primary mb-3">
          <div class="card h-100 border-info">
            <div class="card-body">
              <h4 class="card-title">${item.title}</h4>
              <p>Author: ${item.author}</p>
              <p>Comment: ${item.comment}</p>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onclick="checkedBook(${index})" ${item.checked ? 'checked' : ''}>
                <label class="form-check-label" for="flexCheckDefault">Book read</label>
              </div>
            </div>
          </div>
        </div>
    `;
  });

    books.innerHTML = bookTemplate;  
}

function checkedBook(index) {
    booksList[index].checked = !booksList[index].checked;
    renderBooks();
    updateLocalStorageForBooks();
}


bookButton.addEventListener('click', (event) => {
  event.preventDefault();

  addBook({title: bookTitle.value, author: bookAuthor.value, comment: bookComment.value, checked: false});
});