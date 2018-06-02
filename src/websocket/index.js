
import WebsocketHandler from './WebsocketHandler'

export default function (server) {
  const handler = new WebsocketHandler(server)

  handler.registerRoutes('./build/websocket/')
  handler.dispatchSocketRoute()
}
