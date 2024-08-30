const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var books = [
  {
    id: '1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
  },
  {
    id: '2',
    title: 'Verity',
    author: 'Colleen Hoover',
  },
  {
    id: '3',
    title: 'Paper Towns',
    author: 'John Green',
  },
];

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-TYPE': 'application/json' });
  res.write(JSON.stringify(books));
  res.end();
});

app.get('/book', (req, res) => {
  var bookId = req.query.id;
  var bookIndex = -1;
  for (let i = 0; i < books.length; i++) {
    if (bookId == books[i].bookno) {
      bookIndex = 1;
      break;
    }
  }
  if (bookIndex != 1) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(books[bookIndex]));
    res.end();
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><h1>Book not found</h1></body></html>');
    res.end();
  }
});

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/' + 'form.html');
});

var urlencodedparser = bodyParser.urlencoded({ extended: false });
app.post('/add', urlencodedparser, (req, res) => {
  var book = {
    id: req.body.id,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(book);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><body><h1>Book succesfully Added!</h1></body></html>');
  res.end();
});

app.listen(3000, () =>
  console.log('Server is running on port http://localhost:3000')
);
