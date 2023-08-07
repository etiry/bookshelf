const books = [];

const renderBooks = function () {
  const booksDiv = document.querySelector('.books');

  booksDiv.replaceChildren();

  books.forEach((book) => {
    const template = `
    <div class="book col-md-6">
      <h4>${ book.title }</h4>
      <div>Author: <strong>${ book.author }</strong></div>
      <div>Pages: <strong>${ book.pageCount }</strong></div>
      <div>ISBN: <strong>${ book.isbn }</strong></div>
      <img src="${book.imageURL}" alt="">
    </div>`;
    booksDiv.insertAdjacentHTML('beforeend', template);
  })

};

var fetchBooks = function (query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  fetch(url, {
    method: 'GET',
    dataType: 'json'
  })
    .then(data => data.json())
    .then(data => addBooks(data));
}

const addBooks = function (data) {
  const bookItems = data.items;

  bookItems.forEach((book) => {
    
    const bookItem = {
      title: book.volumeInfo.title || null,
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : null,
      pageCount: book.volumeInfo.pageCount,
      isbn: book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0].identifier : null,
      imageURL: book.volumeInfo.imageLinks.smallThumbnail,
    }

    books.push(bookItem);
    renderBooks();
  })
}

document.querySelector('.search').addEventListener('click', function () {
  const button = this;
  button.disabled = true;
  button.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i> loading...';

  var search = document.querySelector('#search-query').value;

  fetchBooks(search);

  document.querySelector('#search-query').value = '';

  setTimeout(function () {
    button.disabled = false;
    button.innerHTML = 'Search';
  }, 500);

});

renderBooks();