import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

/**
 * @module CartController
 * @description Cart Controller.
 */
// TODO lock down certain requests by Owner(s)
export class PrimusController extends Controller {
  spec(req, res) {
    return res.send(this.app.sockets.spec)
  }
  library(req, res) {
    return res.send(this.app.sockets.library())
  }
}
