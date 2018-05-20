
import mongoose, { Schema } from 'mongoose'
import validate from 'mongoose-validator'
import bcrypt from 'bcrypt'

let emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Incorrect email format'
  })
]

const User = new Schema({
  email: { type: String, required: true, validate: emailValidator },
  password: { type: String, required: true },
  admin: { type: String, required: true }
})

User.statics.findByEmail = function (email, cb) {
  return this
    .model('User')
    .findOne({ email }, cb)
}

User.statics.createWithPassword = async function (email, password) {
  let Model = this.model('User')
  const saltRounds = 10

  let hash = await bcrypt.hash(password, saltRounds)

  return new Model({
    email,
    password: hash,
    admin: false
  })
}

User.statics.findWithPassword = function (email, password, cb) {
  //
}

export default mongoose.model('User', User)
