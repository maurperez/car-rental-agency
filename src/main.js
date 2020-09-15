require('dotenv').config()
const express = require('express')
const configureNunjucks = require('./config/nunjucks')
const configureDependencyInjection = require('./config/di')
const { configureStaticsFiles, configureNotFoundPage, configureSession } = require('./config/express')
const { init: initCarModule } = require('./module/car/module')

const app = express()
const container = configureDependencyInjection()

configureSession(app, container)
configureStaticsFiles(app)
configureNunjucks(app)
initCarModule(app, container)
configureNotFoundPage(app)

const port = process.env.PORT || 3000
app.listen(port, console.log(`app listening on port ${port}`))