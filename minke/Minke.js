const express = require('express');
const EventEmitter = require('events');
const chalk = require('chalk');
const loadCore = require('./core/load-core');

class Minke extends EventEmitter {
  constructor() {
    super();
    
    // 创建express实例
    this.app = express();
    // 程序运行所在目录
    this.dir = process.cwd();
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
    const core = await loadCore(this);
  }
}

module.exports = options => {
  const minke = new Minke(options);
  global.minke = minke;
  return minke;
}