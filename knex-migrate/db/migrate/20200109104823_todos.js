
exports.up = function(knex) {
  return knex.schema
    .createTable('todos', table => {
      table.increments('id');
      table.integer('user_id').references('users.id');
      table.string('name').notNullable();
      table.boolean('complete').defaultTo(false);
      table.datetime('created_at');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('todos');
};
