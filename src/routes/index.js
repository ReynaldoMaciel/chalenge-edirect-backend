/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable prefer-template */
// AutoLoad de rotas
import fs from 'fs'

export default (app, auth) => {
  let routes = {}

  fs.readdirSync(__dirname).forEach((file) => {
    // Ignore the index file, and anything that is not a .js file
    if (
      file === 'index.js'
      || file.substr(file.lastIndexOf('.') + 1) !== 'js'
    ) {
      return
    }

    // Grab all but the file extension for our route name
    const route = file.substr(0, file.indexOf('.'))

    routes[route] = require('./' + route).default

    Object.values(routes).forEach(({ path, router }) => {
      app.use(path, auth, router)
    })
  })
}
