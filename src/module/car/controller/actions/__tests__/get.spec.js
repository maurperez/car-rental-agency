const Joi = require('joi')
const { getAvailable, getById, getRented, index } = require('../get.action')

const mockThisCarController = {
  ROUT_BASE: '/car',
  cleanSessionErrorsAndMessages : jest.fn(),
  carService: {
    getAll: jest.fn(),
    getAllAvailableCars: jest.fn(),
    getRentedCars: jest.fn(),
    getById: jest.fn()
  }
}

describe('get methods', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('GET: get index car page', () => {
    const allCarsFakeResult = 'cars'
    const req = {
      session: {
        error: 'test error',
        message: 'test message'
      }
    }
    const res = { render: jest.fn() }

    beforeEach(() => {
      mockThisCarController.carService.getAll.mockReturnValue(allCarsFakeResult)

      return index.bind(mockThisCarController)(req, res)
    })

    it('call getAll car service method', () => {
      expect(mockThisCarController.carService.getAll).toBeCalledTimes(1)
    })

    it('render the home page with notifications', () => {
      expect(res.render).toBeCalledWith('car/view/home', {
        data: {
          cars: allCarsFakeResult,
          error: req.session.error,
          message: req.session.message
        }  
      })
    })

    it('clean the session', () => {
      expect(mockThisCarController.cleanSessionErrorsAndMessages).toBeCalledWith(req.session)
    })
  })

  describe('GET: get all availables cars', () => {
    const allAvailablesCarsFakeResult = 'cars'
    const req = {
      session: {
        error: 'test error',
        message: 'test message'
      }
    }
    const res = { render: jest.fn() }

    beforeEach(() => {
      mockThisCarController.carService.getAllAvailableCars.mockReturnValue(allAvailablesCarsFakeResult)

      return getAvailable.bind(mockThisCarController)(req, res)
    })

    it('call getAllAvailableCars car service method', () => {
      expect(mockThisCarController.carService.getAllAvailableCars).toBeCalledTimes(1)
    })

    it('render car-list with notifications', () => {
      expect(res.render).toBeCalledWith('car/view/car-list', {
        data: {
          cars: allAvailablesCarsFakeResult,
          error: req.session.error,
          message: req.session.message,
        }
      })
    })

    it('clean the session', () => {
      expect(mockThisCarController.cleanSessionErrorsAndMessages).toBeCalledWith(req.session)
    })
  })

  describe('GET: get all rented cars', () => {
    const allRentedCarsFakeResult = 'cars'
    const req = {
      session: {
        error: 'test error',
        message: 'test message'
      }
    }
    const res = { render: jest.fn() }

    beforeEach(() => {
      mockThisCarController.carService.getRentedCars.mockReturnValue(allRentedCarsFakeResult)

      return getRented.bind(mockThisCarController)(req, res)
    })

    it('call getRentedCars car service method', () => {
      expect(mockThisCarController.carService.getRentedCars).toBeCalledTimes(1)
    })

    it('render car-list with notifications', () => {
      expect(res.render).toBeCalledWith('car/view/car-list', {
        data: {
          cars: allRentedCarsFakeResult,
          error: req.session.error,
          message: req.session.message,
        }
      })
    })

    it('clean the session', () => {
      expect(mockThisCarController.cleanSessionErrorsAndMessages).toBeCalledWith(req.session)
    })

  })

  describe('GET: get car by id', () => {
    const carId = 1
    const oneCarFakeResult = 'car'
    const req = {
      params: {
        id: carId
      },
      session: {
        error: 'test error',
        message: 'test message'
      }
    }
    const res = {
      render: jest.fn()
    }

    beforeEach(() => {
      mockThisCarController.carService.getById.mockReturnValue(oneCarFakeResult)

      return getById.bind(mockThisCarController)(req, res)
    })

    it('call getById car service method', () => {
      expect(mockThisCarController.carService.getById).toBeCalledWith(carId)
    })

    it('render view-one-car with notifications', () => {
      expect(res.render).toBeCalledWith('car/view/view-one-car', {
        data: {
          car: oneCarFakeResult,
          error: req.session.error,
          message: req.session.message,
        }
      })
    })

    it('clean the session', () => {
      expect(mockThisCarController.cleanSessionErrorsAndMessages).toBeCalledWith(req.session)
    })
  })
})