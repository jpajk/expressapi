
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import './lib/response'
import Cors from './lib/middleware/Cors'
import Jwt from './lib/middleware/Jwt'
import routes from './routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(Cors)
app.use(Jwt)
routes.map((router) => {
  app.use(router)
})

export default app
