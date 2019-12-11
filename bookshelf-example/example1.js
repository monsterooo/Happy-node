const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'monsterooo',
    password : '',
    database : 'mydb',
    charset  : 'utf8'
  }
})
const bookshelf = require('bookshelf')(knex)

/**
 * 定义和注册一个模型
 * bookshelf.model(name, [Model], [staticProperties])
 */
const City = bookshelf.model('City', {
  tableName: 'cities'
});

// 查询数据总数
// City.count().then(count => {
//   console.log('city count: ', count);
// })

// 辅助函数检索给定模型的实例
// City.fetchAll().then(colls => {
//   // colls => https://bookshelfjs.org/api.html#Collection
//   console.log('Colls: ', colls);
// })

// City.forge().fetchAll().then(result => {
//   console.log('result: ', JSON.stringify(result));
// })
// City.fetchAll().then(result => {
//   console.log('result: ', JSON.stringify(result));
// })



