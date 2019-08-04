/* eslint-disable */
// AutoLoad de models
import fs from 'fs'

const models = {}

fs.readdirSync(__dirname).forEach(function(file) {
  // Ignore the index file, and anything that is not a .js file
  if (
    file === 'index.js' ||
    file === 'BaseModel.js' ||
    file.substr(file.lastIndexOf('.') + 1) !== 'js'
  ) {
    return
  }

  // Grab all but the file extension for our model name
  const model = file.substr(0, file.indexOf('.'))

  // require it in place in the object we're going to export
  models[model] = require('./' + model).default
})

module.exports = models
