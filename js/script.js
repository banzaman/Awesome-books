/**
 * Declarations
 */
const inputTitle = document.getElementById('inputTitle');
const inputAuthor = document.getElementById('inputAuthor');
const divBooks = document.querySelector('.books');
const form = document.getElementsByTagName('form')[0];
let booksCollection = [];
const bookTemplate = `<div class="bookRow"><label id="title">{book.title}</label><label id="author">{book.author}</label>
    <button type="button" class="remove" id="{book.id}" onclick="removeBook(this.id);">Remove</button>
    </div><hr>`;

/**
     * Functions
     */
function Book(id, author, title) {
  this.id = id;
  this.title = title;
  this.author = author;
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22
            // Firefox
            || e.code === 1014
            // test name field too, because code might not be present
            // everything except Firefox
            || e.name === 'QuotaExceededError'
            // Firefox
            || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
            // acknowledge QuotaExceededError only if there's something already stored
            && (storage && storage.length !== 0);
  }
}
function AddBook() {
  let id = 1;
  let books = localStorage.getItem('books');
  if (books != null) {
    booksCollection = JSON.parse(books);
    const ids = booksCollection.map((object) => parseInt(object.id, 10));
    const maxId = Math.max(...ids);
    id = maxId + 1;
  }

  const objectBook = new Book(id.toString(), inputAuthor.value, inputTitle.value);
  booksCollection.push(objectBook);

  books = JSON.stringify(booksCollection);
  localStorage.setItem('books', books);
}

function removeBook(id) {
  if (id > 0) {
    let books = localStorage.getItem('books');
    if (books != null) {
      booksCollection = JSON.parse(books);
    }
    const booksResult = booksCollection.filter((bk) => parseInt(bk.id, 10) !== parseInt(id, 10));
    if (booksResult.length === 0) {
      localStorage.removeItem('books');
    } else {
      books = JSON.stringify(booksResult);
      localStorage.setItem('books', books);
    }
    window.location.reload();
  }
}
function setBooksForm() {
  removeBook(-1);
  const books = localStorage.getItem('books');
  const booksCollection = JSON.parse(books);
  let allBooks = '';
  for (let index = 0; index < booksCollection.length; index += 1) {
    const book = booksCollection[index];
    allBooks += bookTemplate
      .replace('{book.title}', book.title)
      .replace('{book.author}', book.author)
      .replace('{book.id}', parseInt(book.id, 10));
  }
  divBooks.innerHTML = allBooks;
}

/**
 * Events
 */
form.addEventListener('submit', () => {
  if (storageAvailable('localStorage')) {
    AddBook();
  }
});
window.addEventListener('load', () => {
  if (storageAvailable('localStorage')) {
    if (localStorage.getItem('books')) {
      setBooksForm();
    }
  }
});
