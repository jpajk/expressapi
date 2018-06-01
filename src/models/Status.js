
import mongoose, { Schema } from 'mongoose'
import { EventEmitter } from 'events'

const Status = new Schema({
  message: { type: String, required: true },
  userId: { type: String, required: true },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
})

const StatusEvents = new EventEmitter()

Status.post('save', function (status) {
  StatusEvents.emit('status.saved', status)
})

export { StatusEvents }

export default mongoose.model('Status', Status)
