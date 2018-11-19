var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_URL: '"http://devbooking.bzone.vn/api/v2"',
  API_URL: '"http://bzone.testingserver.vn/api/v2"',
  FB_APP_ID: '"1637966656508513"',
  GOOGLE_MAP_KEY: '"AIzaSyC4Lr23cLmL1FNhKbVZepiG6MsXcwNPvVA"',
  DOMAIN: '"http://bzone.testingserver.vn"',
  NEWS_URL: '"http://bzone.testingserver.vn"',
  MIXPANEL_PROJECT_TOKEN: '"3520d09f4365e0cf75b2f1ecde1c5f46"',
  GA_ID: '"UA-106224118-1"'
})
