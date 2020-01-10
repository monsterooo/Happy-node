
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'jiangzhu1', email: 'qq@qq.com'},
        {id: 2, name: 'jiangzhu2', email: 'qq@qq.com'},
        {id: 3, name: 'jiangzhu3', email: 'qq@qq.com'},
      ]);
    });
};
