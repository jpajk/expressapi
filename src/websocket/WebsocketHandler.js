
import path from 'path'
import fs from 'fs'
import url from 'url'
import WebSocket from 'ws'
import User from '../models/User'

class WebsocketHandler {
  constructor (server) {
    this.wss = new WebSocket.Server({ server })
    this.websocketRoutes = {}
  }

  registerRoutes (routesDir) {
    let routesArr = fs.readdirSync(routesDir)

    routesArr.forEach((content) => {
      let required = require(path.resolve(routesDir + content))
      this.websocketRoutes[required.default.route] = required.default.handler
    })
  }

  getHandler (url) {
    if (this.websocketRoutes[url]) {
      return this.websocketRoutes[url]
    }

    return false
  }

  dispatchSocketRoute () {
    this.wss.on('connection', async (ws, req) => {
      let socketRoute = url.parse(req.url, true)
      let socketPathName = socketRoute.pathname

      let handler = this.getHandler(socketPathName)

      try {
        let user = await User.findByToken(socketRoute.query.token)

        if (user && handler) {
          handler(ws, this, user)
        } else {
          ws.close()
        }
      } catch (err) {
        ws.close()
      }
    })
  }
}

export default WebsocketHandler
