const books = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    imageURL: 'https://books.google.com/books/content?id=WV8pZj_oNBwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    isbn: '9781921479311',
    pageCount: 268
  }
];

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

renderBooks();