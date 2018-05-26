
import fs from 'fs'
import path from 'path'

const routesPath = './build/routes/'
let routes = []

let routesArr = fs.readdirSync(routesPath)

routesArr.forEach((content) => {
  if (content === 'index.js') {
    return
  }

  let required = require(path.resolve(routesPath + content))
  routes.push(required.default)
})

export default routes
