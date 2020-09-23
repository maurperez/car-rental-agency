const {default: DIContainer, object, get, factory} = require('rsdi')
const multer = require('multer')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('express-session')
const Sqlite3Database = require('better-sqlite3')

const {
  CarController,
  CarService,
  CarRepository,
} = require('../module/car/module')

function initializeDatabaseAdapter() {
  return new Sqlite3Database(process.env.DB_PATH)
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.IMAGE_UPLOAD_DIR)
    },
  })

  return multer({storage})
}

function configureUrlEncodedParser() {
  const urlencodedParser = bodyParser.urlencoded({
    extended: false,
  })

  return urlencodedParser
}

function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800000

  const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: ONE_WEEK_IN_SECONDS},
  }
  return session(sessionOptions)
}

function initializeNunjucksFileSystemLoader() {
  return new nunjucks.FileSystemLoader('src/module', {
    watch: true,
    noCache: true,
  })
}

/**
 * @returns {import('nunjucks').ConfigureOptions}
 */
function configurationNunjucksEnvironment() {
  return {
    autoescape: true,
  }
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    MainDatabaseAdapter: factory(initializeDatabaseAdapter),
    Multer: factory(configureMulter),
    UrlencodedParser: factory(configureUrlEncodedParser),
    Session: factory(configureSession),
  })
}

/**
 * @param {DIContainer} container
 */
function addNunjucksDefinitions(container) {
  container.addDefinitions({
    NunjucksFSL: factory(initializeNunjucksFileSystemLoader),
    NunjucksEnv: object(nunjucks.Environment).construct(
      get('NunjucksFSL'),
      factory(configurationNunjucksEnvironment)
    ),
  })
}

/**
 * @param {DIContainer} container
 */
function addCarModuleDefinitions(container) {
  container.addDefinitions({
    CarController: object(CarController).construct(
      get('Multer'),
      get('UrlencodedParser'),
      get('CarService')
    ),
    CarService: object(CarService).construct(get('CarRepository')),
    CarRepository: object(CarRepository).construct(get('MainDatabaseAdapter')),
  })
}

module.exports = function configureDi() {
  const container = new DIContainer()
  addCommonDefinitions(container)
  console.log('\x1b[93m', 'Initialized common dependencies')
  addNunjucksDefinitions(container)
  console.log('\x1b[93m', 'Initialized nunjucks')
  addCarModuleDefinitions(container)
  console.log('\x1b[93m', 'Initialized Car module')

  return container
}
