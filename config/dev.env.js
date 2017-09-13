var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://beautify.dev/api/v1"',
  FB_APP_ID: '"1637966656508513"',
  GOOGLE_MAP_KEY: '"AIzaSyC4Lr23cLmL1FNhKbVZepiG6MsXcwNPvVA"'
})
