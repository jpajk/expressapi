
import express from 'express'
import mongoose from 'mongoose'

import routes from './routes'
import config from './config'

const app = express()
mongoose.connect(config.database)

app.use(routes)

app.listen(3000)
