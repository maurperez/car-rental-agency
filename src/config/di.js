const { default: DIContainer, object, get, factory } = require('rsdi')
const multer = require('multer')
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

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions (container) {
  container.addDefinitions({
    MainDatabaseAdapter: factory(configureMainDatabaseAdapter),
    Multer: factory(configureMulter)
  })
}

/**
 * @param {DIContainer} container
 */
function addCarModuleDefinitions (container) {
  container.addDefinitions({
    CarController: object(CarController).construct(get('Multer'), get('CarService')),
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
