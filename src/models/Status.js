
import mongoose, { Schema } from 'mongoose'

const Status = new Schema({
  message: { type: String, required: true },
  userId: { type: String, required: true },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
})

export default mongoose.model('Status', Status)
