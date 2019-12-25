const App = require('./app');

const app = App();

// app.match('/books', { controller: 'book', action: 'index', method: 'get' });
// app.match('/books/put', { controller: 'book', action: 'put', method: 'put' });
// app.match('/books/put', { to: 'book#put', method: 'put' });
// app.match('/books/:title/:name', { controller: 'book', action: 'index', method: 'get' });
// app.get('/books/view', { to: 'book#index' })
// app.get('/books/single', { to: ctx => {
//   ctx.body = 'books/single'
// } })

app.start();