
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, first_name: 'zhu', last_name: 'jiang'},
        {id: 2, first_name: 'ooo', last_name: 'monster'},
        {id: 3, first_name: 'think', last_name: 'create'},
      ]);
    });
};
