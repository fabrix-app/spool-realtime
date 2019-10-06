'use strict'

const Spark = require('../../../../dist').Spark

module.exports = class TestSpark extends Spark {
  listen(spark) {
    spark.on('data', function (data) {
      console.log('TEST client message', data)
      spark.write({ ping: true })
    })
    return spark
  }


  connection(spark) {
    // On Each Connection we will tell the client to pong
    // console.log('TEST connection', spark, spark.headers, spark.address)

    // console.log('TEST id', spark.id, spark)

    console.log('connection has the following headers', spark.headers)
    console.log('connection was made from', spark.address)
    console.log('connection id', spark.id)

    this.addSpark(spark.mirage, spark)

    // Test adding a listener
    this.listen(spark)

    spark.on('data', function(data) {
      console.log('PRINTED FROM SERVER:', data)
      spark.write('Server Received')
    })

    spark.on('heartbeat', function() {
      console.log(spark.id, 'hearbeat...')
    })

    // Test writing to spark
    spark.write({ pong: false })
    spark.write({ ping: false })
    spark.write({ pong: true })
  }

  disconnection(spark) {
    console.log('TEST disconnection', spark)
    this.removeSpark(spark.mirage)
  }
}
