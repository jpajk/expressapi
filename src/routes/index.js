
import { Router } from 'express'
import User from '../models/User'

const router = Router()

router.get('/', function (req, res) {
  res.relayResponse({
    message: 'Welcome to the API'
  })
})

router.post('/register', function (req, res) {
  let email = req.body.email || false
  let password = req.body.password || false

  new Promise((resolve, reject) => {
    User.findByEmail(email, (err, user) => {
      if (err) { throw err }

      if (user) {
        return reject(new Error('The user already exists'))
      }

      resolve()
    })
  }).then(() => {
    let userPromise = User.createWithPassword(email, password)

    userPromise.then(user => {
      user.save((err) => {
        if (err) {
          return res.error(err.message)
        }

        res.success({
          message: 'Register success'
        })
      })
    })
  }).catch(err => {
    res.error(err.message)
  })
})

router.get('/login', function (req, res) {
  res.json('went great')
})

export default router
