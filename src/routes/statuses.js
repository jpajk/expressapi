
import { Router } from 'express'

const router = Router()

router.get('/statuses', async function (req, res) {
  res.success({
    message: 'Whatever statuses'
  })
})

export default router
