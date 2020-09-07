require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('src/module', {
  autoescape: true,
  express: app
})
