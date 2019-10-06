const Controller = require('@fabrix/fabrix/dist/common').FabrixController

module.exports = class TestController extends Controller {
  broadcast(req, res) {

    this.app.sockets.forEach(function (spark, id, connections) {
      spark.write(req.body)
    })

    res.json(req.body)
  }
}
