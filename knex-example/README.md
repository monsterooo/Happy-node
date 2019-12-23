## knex

http://knexjs.org/
http://zetcode.com/javascript/knex/

#### migrate

`knex init` 创建knex环境配置文件

`knex migrate:make migration_name` 创建一个迁移文件，文件中是创建数据库的schema语法

`knex migrate:latest` 执行迁移

`knex migrate:up migration_name.js` 指定迁移某个文件

`knex migrate:rollback` 回滚最后一次迁移

`kenx migrate:down migration_name.js` 指定撤销某个迁移

`knex migrate:list` 查找已完成和未完成的迁移





