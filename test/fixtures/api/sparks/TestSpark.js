const Spark = require('../../../../dist').Spark

module.exports = class TestSpark extends Spark {
  connection(spark) {
    console.log('TEST conneciton', spark)
  }
  disconnection(spark) {
    console.log('TEST disconnection', spark)
  }
}
