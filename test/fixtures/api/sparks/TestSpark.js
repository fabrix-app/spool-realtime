const Spark = require('../../../../dist').Spark

module.exports = class TestSpark extends Spark {
  sparks = new Map()

  connection(spark) {
    // On Each Connection we will tell the client to pong
    console.log('TEST connection', spark)
    spark.write({ pong: true })
  }

  disconnection(spark) {
    console.log('TEST disconnection', spark)
  }
}
