/**
 * Declarations
 */
const inputTitle = document.getElementById('inputTitle');
const inputAuthor = document.getElementById('inputAuthor');
const divBooks = document.querySelector('.books');
const form = document.getElementsByTagName('form')[0];
const link1 = document.getElementById('link1');
const link2 = document.getElementById('link2');
const link3 = document.getElementById('link3');
const section1 = document.getElementById('sectionGrid');
const section2 = document.getElementById('sectionInput');
const section3 = document.getElementById('contact');

const bookTemplate = `<div class="bookRow"><label id="bookEntry">"{book.title}" by {book.author}</label>
    <button type="button" class="remove" id="{book.id}" onclick="removeBook(this.id);">Remove</button>
    </div>`;
/**
 * Class Definition
 */
class BookStore {
  #books;

  #itemName;

  #booksCollection = [];

  constructor(itemName) {
    this.#itemName = itemName;
  }

  addBook(author, title) {
    let id = 1;
    this.#booksCollection = this.getBookStorage();
    if (this.#booksCollection !== null) {
      const ids = this.#booksCollection.map((object) => parseInt(object.id, 10));
      const maxId = Math.max(...ids);
      id = maxId + 1;
    }
    const objectBook = { id: id.toString(), author, title };
    this.setBookStorage(objectBook);
  }

  removeBook(id) {
    if (id > 0) {
      this.#booksCollection = this.getBookStorage();
      const result = this.#booksCollection.filter((bk) => parseInt(bk.id, 10) !== parseInt(id, 10));
      this.removeBookStorage(result);
    }
  }

  getBookStorage() {
    this.#books = localStorage.getItem(this.#itemName);
    return (this.#books === null) ? null : JSON.parse(this.#books);
  }

  setBookStorage(objectBook) {
    if (this.#booksCollection === null) {
      this.#booksCollection = [];
    }
    this.#booksCollection.push(objectBook);
    this.#books = JSON.stringify(this.#booksCollection);
    localStorage.setItem(this.#itemName, this.#books);
  }

  removeBookStorage(booksResult) {
    if (booksResult.length === 0) {
      localStorage.removeItem(this.#itemName);
    } else {
      this.#books = JSON.stringify(booksResult);
      localStorage.setItem(this.#itemName, this.#books);
    }
  }
}
/**
 * Object instantiation
 */
const bookStore = new BookStore('books');

/**
* Functions
*/
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

function removeBook(id) {
  if (id > 0) {
    bookStore.removeBook(id);
    window.location.reload();
  }
}

function setBooksForm() {
  removeBook(-1);
  const booksCollection = bookStore.getBookStorage();
  let allBooks = '';
  for (let index = 0; index < booksCollection.length; index += 1) {
    const isRowPair = index % 2;
    const book = booksCollection[index];
    allBooks += bookTemplate
      .replace('{book.title}', book.title)
      .replace('{book.author}', book.author)
      .replace('{book.id}', parseInt(book.id, 10))
      .replace('bookRow', (isRowPair === 0) ? 'bookRow alternateRow' : 'bookRow');
  }
  divBooks.innerHTML = allBooks;
}

/**
 * Events
 */
form.addEventListener('submit', () => {
  if (storageAvailable('localStorage')) {
    bookStore.addBook(inputAuthor.value, inputTitle.value);
  }
});
window.addEventListener('load', () => {
  if (storageAvailable('localStorage')) {
    setBooksForm();
  }
});

function selectLink(section) {
  section.classList.remove('deactivate');
  section.classList.add('activateSection');
}
link1.addEventListener('click', selectLink(section1));
// link2.addEventListener('click', selectLink(section2), false);
// link3.addEventListener('click', selectLink(section3), false);

//  Date
const datePlace = document.querySelector('.date');
datePlace.innerHTML = Date();
