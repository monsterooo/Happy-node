const express = require('express');
const EventEmitter = require('events');
const chalk = require('chalk');
const loadApi = require('./core/load-api');

class Minke extends EventEmitter {
  constructor() {
    super();
    
    // 创建express实例
    this.app = express();
    // 程序运行所在目录
    this.dir = process.cwd();
    /**
     * 保存程序中的 routes controllers models routes config
     */
    this.api = {};
  }

  async start(cb) {
    await this.load();
    try {
      this.app.listen(3000, () => {
        console.log(chalk.bold(`Listen on 3000 port`));
      });
    } catch(err) {

    }
  }
  async load() {
    const core = await loadApi(this);
  }
}

module.exports = options => {
  const minke = new Minke(options);
  global.minke = minke;
  return minke;
}