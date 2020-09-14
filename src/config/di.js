const { default: DIContainer, object, get, factory } = require('rsdi')
const multer = require('multer')
const bodyParser = require('body-parser')
const session = require('express-session')
const Sqlite3Database = require('better-sqlite3')

const { CarController, CarService, CarRepository } = require('../module/car/module')

function configureMainDatabaseAdapter () {
  return new Sqlite3Database(process.env.DB_PATH)
}

function configureMulter () {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.IMAGE_UPLOAD_DIR)
    }
  })

  return multer({ storage })
}

function configureUrlEncodedParser () {
  const urlencodedParser = bodyParser.urlencoded({
    extended: false
  })

  return urlencodedParser
}

function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions)
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions (container) {
  container.addDefinitions({
    MainDatabaseAdapter: factory(configureMainDatabaseAdapter),
    Multer: factory(configureMulter),
    UrlencodedParser: factory(configureUrlEncodedParser),
    Session: factory(configureSession)
  })
}

/**
 * @param {DIContainer} container
 */
function addCarModuleDefinitions (container) {
  container.addDefinitions({
    CarController: object(CarController).construct(get('Multer'), get('UrlencodedParser'), get('CarService')),
    CarService: object(CarService).construct(get('CarRepository')),
    CarRepository: object(CarRepository).construct(get('MainDatabaseAdapter'))
  })
}

module.exports = function configureDi () {
  const container = new DIContainer()
  addCommonDefinitions(container)
  addCarModuleDefinitions(container)

  return container
}
