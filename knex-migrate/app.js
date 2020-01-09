const env = process.env.NODE_ENV || 'development';
const knexFile = require('./knexfile');
const knex = require('knex')(knexFile[env]);
const bookshelf = require('bookshelf')(knex);

const Todo = bookshelf.model('Todo', {
  tableName: 'todos',
  user() {
    return this.belongsTo('User');
  }
});
const User = bookshelf.model('User', {
  tableName: 'users',
  todo() {
    return this.hasMany('Todo');
  }
});

// const todo = new Todo({id: 1}).user().fetch().then(t => {
//   console.log('>> ', t)
// })

// 通过User查询所有下面的todos
// new User({id: 1}).todo().fetch().then(t => {
//   console.log('>> ', t)
// })

// 通过user_id关联User
// new Todo({id: 1}).fetch({
//   withRelated: ['user']
// }).then(v => {
//   console.log('>>> ', v.toJSON());
// })

// 通过在Todo中的user_id查询到User中的所有todos
// new User({id: 1}).fetch({
//   withRelated: ['todo']
// }).then(v => {
//   console.log('User > ', v.toJSON())
// })


// console.log(todo)

// new User({
//   name: 'monsterooo',
//   email: 'monsterooo@gmail.com'
// }).save();

// todo = new Todo({
//   name: 'test 1',
//   user_id: 1,
// })

// todo.save().then(model => {
//   console.log('saved > ', model);
// })