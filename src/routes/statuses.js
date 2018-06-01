
import { Router } from 'express'
import Status from '../models/Status'

const router = Router()

router.post('/statuses', async function (req, res) {
  let statusMessage = req.body.statusMessage

  let status = new Status({
    userId: req.user._id,
    message: statusMessage
  })

  status.save(err => {
    if (err) {
      return res.error(err.message)
    }

    res.success({
      message: 'Saved successfully'
    })
  })
})

export default router
