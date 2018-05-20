
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import routes from './routes'
import config from './config'
import './lib/response'

const app = express()
mongoose.connect(config.database)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))
app.use(routes)

app.listen(3000)
