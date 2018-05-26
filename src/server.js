
import mongoose from 'mongoose'
import app from './app'
import config from './config'

mongoose.connect(config.database)
app.listen(8888)
