import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

/**
 * @module PrimusController
 * @description Primus Controller
export class PrimusController extends Controller {
  spec(req, res) {
    return res.send(this.app.sockets.spec)
  }
  library(req, res) {
    return res.send(this.app.sockets.library())
  }
}
