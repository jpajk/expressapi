
import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.success({
    message: 'Welcome to the API'
  })
})

export default router
