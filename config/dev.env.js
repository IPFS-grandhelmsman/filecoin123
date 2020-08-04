'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // BASE_API: '"https://api.filscan.io:8700/v0/filscan"'
  BASE_API: '"https://api.dapponline.io/dappapi"'
})
