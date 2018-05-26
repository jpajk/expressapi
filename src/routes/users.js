
import { Router } from 'express'
import User from '../models/User'
import config from '../config'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/users/register', async function (req, res) {
  let email = req.body.email || false
  let password = req.body.password || false

  if (!email) {
    return res.error('Wrong email')
  }

  let existingUser = await User.findByEmail(email)

  if (existingUser) {
    return res.error('The user already exists')
  }

  let newUser = await User.createWithPassword(email, password)

  let payload = {
    admin: newUser.admin
  }

  newUser.token = await jwt.sign(payload, config.secret, {
    expiresIn: 60
  })

  newUser.save(err => {
    if (err) {
      return res.error(err.message)
    }

    res.success({
      message: 'Register success',
      data: {
        currentUser: newUser
      }
    })
  })
})

router.post('/users/login', async function (req, res) {
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

  user.token = await jwt.sign(payload, config.secret, {
    expiresIn: 60
  })

  user.save()

  res.success({
    message: 'Login successful',
    data: {
      currentUser: user
    }
  })
})

router.post('/users/logout', async function (req, res) {
  //
})

export default router
