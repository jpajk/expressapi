
import mongoose from 'mongoose'
import { createServer } from 'http'
import websocket from './websocket'

import app from './app'
import config from './config'

mongoose.connect(config.database)

const server = createServer(app)
websocket(server)

server.listen(8888)
