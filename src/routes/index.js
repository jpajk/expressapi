
import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.json('this also went great')
})

router.get('/api', function (req, res) {
  res.json('went great')
})

export default router