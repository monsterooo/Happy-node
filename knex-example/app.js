const Knex = require('knex');
const config = require('./knexfile')['development'];

const knex = Knex(config);

const user = knex('user').first();
// const user = knex.select().from('user');
user.then(r => {
  console.log(r)
})