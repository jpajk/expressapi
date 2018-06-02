
import Status, { StatusEvents } from '../models/Status'

const statusQuery = function (cb) {
  Status.find()
    .limit(10)
    .sort({ created: -1 })
    .exec((err, result) => {
      if (err) {
        throw err
      }

      cb(result)
    })
}

export default {
  route: '/statuses',
  handler: async function (ws) {
    statusQuery((statuses) => {
      ws.send(JSON.stringify(statuses))
    })

    StatusEvents.on('status.saved', () => {
      statusQuery((statuses) => {
        ws.send(JSON.stringify(statuses))
      })
    })
  }
}
