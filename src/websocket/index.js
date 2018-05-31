
import WebSocket from 'ws'

export default function (server) {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received: %s', message)
      ws.send(`Hello, you sent -> ${message}`)
    })
  })
}
