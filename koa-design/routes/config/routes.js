module.exports = app => {
  // app.get('/books/view', {to: 'book#index'});
  // app.get('/books/single', {to: ctx => {
  //   ctx.body = 'books/single'
  // }});
  app.resources('posts');
}