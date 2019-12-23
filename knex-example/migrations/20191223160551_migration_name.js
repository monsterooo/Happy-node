
exports.up = function(knex) {
  return knex.schema
    .createTable('user', table => {
      table.increments('id');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
    })
    .createTable('product', table => {
      table.increments('id');
      table.decimal('price').notNullable();
      table.string('name', 1000).notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('user')
    .dropTable('product');
};
