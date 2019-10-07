'use strict'

const Spark = require('../../../../dist').Spark

module.exports = class TestSpark extends Spark {

  listen(spark) {
    spark.on('data', function (data) {
      console.log('TEST client message', spark.id, data)
      if (data.ping) {
        spark.write({pong: true})
      }
    })

    spark.on('error', function(err) {
      console.log(spark.id, 'ERROR PRINTED FROM SERVER:', err)
    })

    spark.on('heartbeat', function() {
      console.log(spark.id, 'hearbeat...')
    })

    return spark
  }


  data(spark) {
    console.log('TEST data', spark)
    console.log('data has the following headers', spark.headers)
    console.log('data was made from', spark.address)
    console.log('data id', spark.id)
  }

  plugin(spark) {
    console.log('TEST plugin', spark)
  }

  plugout(spark) {
    console.log('TEST plugout', spark)
  }

  close(spark) {
    console.log('TEST close', spark)
  }

  end(spark) {
    console.log('TEST end', spark)
  }

  connection(spark) {
    // On Each Connection we will tell the client to pong
    // console.log('TEST connection', spark, spark.headers, spark.address)

    // console.log('TEST id', spark.id, spark)
    console.log('TEST connection', spark)
    console.log('connection has the following headers', spark.headers)
    console.log('connection was made from', spark.address)
    console.log('connection id', spark.id)

    this.addSpark(spark.mirage, spark)

    // Test adding a listener
    this.listen(spark)

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
