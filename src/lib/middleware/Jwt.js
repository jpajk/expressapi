
import config from '../../config'
import User from '../../models/User'

export default async function (req, res, next) {
  if (config.allowedRoutes.indexOf(req.url) >= 0) {
    return next()
  }

  let token = req.get('Authorization') || ''
  token = token.replace('Bearer', '').trim()

  if (!token) {
    return res.clientError('No token')
  }

  try {
    let user = await User.findByToken(token)

    if (user) {
      req.user = user
    }

    next()
  } catch (err) {
    return res.clientError(err.message)
  }
}
