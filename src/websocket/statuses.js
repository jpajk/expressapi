
import User from '../models/User'

export default {
  route: '/statuses',
  handler: function (ws) {
    let stream = User.find().stream()

    stream.on('data', (data) => {
      ws.send(JSON.stringify(data))
    })
  }
}
