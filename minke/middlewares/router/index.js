

module.exports = minke => {
  return {
    beforeInitialize() {
      log('middleware/router/index.js beforeInitialize')
    },
    initialize() {
      console.log('middleware/router/index.js initialize');
    }
  }
}


