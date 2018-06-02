
import fs from 'fs'
import path from 'path'
import url from 'url'
import WebSocket from 'ws'

const websocketsPath = './build/websocket/'
let websocketRoutes = {}

let routesArr = fs.readdirSync(websocketsPath)

routesArr.forEach((content) => {
  if (content === 'index.js') {
    return
  }

  let required = require(path.resolve(websocketsPath + content))
  websocketRoutes[required.default.route] = required.default.handler
})

const dispatchWebsocketRoute = function (url) {
  if (websocketRoutes[url]) {
    return websocketRoutes[url]
  }

  return false
}

export default function (server) {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', (ws, req) => {
    let socketRoute = url.parse(req.url, true)

    let socketPathName = socketRoute.pathname
    console.log('my token', socketRoute.query.token)
    let handler = dispatchWebsocketRoute(socketPathName)

    if (handler) {
      handler(ws)
    } else {
      ws.close()
    }
  })
}
