const Knex = require('knex');
const BookShelf = require('bookshelf');
const config = require('./knexfile')['development'];

const knex = Knex(config); // knex Instance
const bookshelf = BookShelf(knex);

const User = bookshelf.model('User', {
  tableName: 'user',
});

console.log('User Model > ', new User);
// User.fetchAll().then(v => {
//   console.log(v.toJSON());
// })