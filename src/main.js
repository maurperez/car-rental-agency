require('dotenv').config()
const express = require('express')
const configureNunjucks = require('./config/nunjucks')
const configureDependencyInjection = require('./config/di')
const { configureStaticsFiles, configureNotFoundPage, configureExpressSession, configureHomePage } = require('./config/express')
const { init: initCarModule } = require('./module/car/module')

const app = express()
const container = configureDependencyInjection()

configureExpressSession(app, container)
configureStaticsFiles(app)
configureNunjucks(app, container)
initCarModule(app, container)
configureHomePage(app, container)
configureNotFoundPage(app)

const port = process.env.PORT || 3000
app.listen(port, console.log(`app listening on port ${port}`))