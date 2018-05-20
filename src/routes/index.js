
import { Router } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import config from '../config'

const router = Router()

router.get('/', function (req, res) {
  res.relayResponse({
    message: 'Welcome to the API'
  })
})

router.post('/register', async function (req, res) {
  let email = req.body.email || false
  let password = req.body.password || false

  let existingUser = await User.findByEmail(email)

  if (existingUser) {
    return res.error('The user already exists')
  }

  let newUser = await User.createWithPassword(email, password)

  newUser.save(err => {
    if (err) {
      return res.error(err.message)
    }

    res.success({
      message: 'Register success'
    })
  })
})

router.post('/login', async function (req, res) {
  let email = req.body.email || false
  let password = req.body.password || false

  let user = await User.findByEmail(email)

  if (!user) {
    return res.error('Wrong email or password.')
  }

  let result = await user.comparePassword(password)

  if (!result) {
    return res.error('Wrong email or password.')
  }

  let payload = {
    admin: user.admin
  }

  let token = await jwt.sign(payload, config.secret, {
    expiresIn: 60
  })

  user.token = token
  user.save()

  res.success({
    message: 'Login successful',
    data: {
      token
    }
  })
})

export default router
