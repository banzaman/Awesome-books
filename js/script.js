const addButton= document.getElementById("addButton");
const inputTitle=document.getElementById("inputTitle");
const inputAuthor=document.getElementById("inputAuthor");
const divBooks=document.querySelector(".books");
const form = document.getElementsByTagName('form')[0];
const buttonRemove=document.querySelector('.remove');
var bookTemplate=`"<div>
    <label id="title">{book.title}</label>
    <label id="author">{book.author}</label>
    <button type="button" class="remove" id="{book.id}" onclick="removeBook(this.id);">Remove</button>
    <hr>
</div>`;
// const objectBook= {};
// objectBook.author;
// objectBook.title;
function Book(id, author, title)
{
    this.id=id;
    this.title=title;
    this.author=author;
};
// objectBook.add=Add();
var booksCollection=[];


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
    // const book = { author: inputAuthor.value, title: inputTitle.value };
    id=0;
     books = localStorage.getItem('books');
     if (books!=null){
         booksCollection = JSON.parse(books);
          id=booksCollection.length;
     }
    
     const objectBook=new Book(id, inputAuthor.value, inputTitle.value)
    booksCollection.push(objectBook);
    
    books = JSON.stringify(booksCollection);
    localStorage.setItem('books', books);
}
form.addEventListener('submit', () => {
    if (storageAvailable('localStorage')) {
     AddBook();
    }
  });

function setBooksForm() {
    books = localStorage.getItem('books');
    const booksCollection = JSON.parse(books);
    var allBooks='';
    for (let index = 0; index < booksCollection.length; index = index + 1) {
        const book = booksCollection[index];
        allBooks=allBooks + bookTemplate
        .replace('{book.title}', book.title)
        .replace('{book.author}', book.author)
        .replace('{book.id}', book.id)
    }
    divBooks.innerHTML=allBooks;
}
    
    
  window.addEventListener('load', () => {
    if (storageAvailable('localStorage')) {
      if (localStorage.getItem('books')) {
        setBooksForm();
      }
    }
  });
function removeBook(id){
    books = localStorage.getItem('books');
    if (books!=null){
        booksCollection = JSON.parse(books);
    } 
    booksCollectionResult= booksCollection.filter(bk=> bk.id!=id);
     books = JSON.stringify(booksCollectionResult);
    localStorage.setItem('books', books);
}
//   if (document.body.contains(buttonRemove)) {
//     buttonRemove.addEventListener('click', ()=>{
//         if (storageAvailable('localStorage')) {
//             if (localStorage.getItem('books')) {
//               removeBook(bottonRemote.id);
//             }
//           }
//     })
//   }


