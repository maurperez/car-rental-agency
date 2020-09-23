const {getAvailable, getById, getRented, index} = require('../get.action')

const mockThisCarController = {
  ROUT_BASE: '/car',
  cleanSessionErrorsAndMessages: jest.fn(),
  carService: {
    getAll: jest.fn(),
    getAllAvailableCars: jest.fn(),
    getRentedCars: jest.fn(),
    getById: jest.fn(),
  },
}

describe('get methods', () => {
  describe('GET: get index car page', () => {
    const allCarsFakeResult = 'cars'
    const req = {
      session: {
        error: 'test error',
        message: 'test message',
      },
    }
    const res = {render: jest.fn()}

    beforeAll(() => {
      mockThisCarController.carService.getAll.mockReturnValue(allCarsFakeResult)
      index.apply(mockThisCarController, [req, res])
    })

    it('calls getAll method of car service', () => {
      expect(mockThisCarController.carService.getAll).toBeCalledTimes(1)
    })

    it('renders the home page with notifications', () => {
      expect(res.render).toBeCalledWith('car/view/home', {
        data: {
          cars: allCarsFakeResult,
          error: req.session.error,
          message: req.session.message,
        },
      })
    })

    it('cleans the session', () => {
      expect(
        mockThisCarController.cleanSessionErrorsAndMessages
      ).toBeCalledWith(req.session)
    })

    afterAll(jest.resetAllMocks)
  })

  describe('GET: get all availables cars', () => {
    const allAvailablesCarsFakeResult = 'cars'
    const req = {
      session: {
        error: 'test error',
        message: 'test message',
      },
    }
    const res = {render: jest.fn()}

    beforeAll(() => {
      mockThisCarController.carService.getAllAvailableCars.mockReturnValue(
        allAvailablesCarsFakeResult
      )
      getAvailable.apply(mockThisCarController, [req, res])
    })

    it('calls getAllAvailableCars method of car service', () => {
      expect(
        mockThisCarController.carService.getAllAvailableCars
      ).toBeCalledTimes(1)
    })

    it('renders car-list with notifications', () => {
      expect(res.render).toBeCalledWith('car/view/car-list', {
        data: {
          cars: allAvailablesCarsFakeResult,
          error: req.session.error,
          message: req.session.message,
        },
      })
    })

    it('cleans the session', () => {
      expect(
        mockThisCarController.cleanSessionErrorsAndMessages
      ).toBeCalledWith(req.session)
    })

    afterAll(jest.clearAllMocks)
  })

  describe('GET: get all rented cars', () => {
    const allRentedCarsFakeResult = 'cars'
    const req = {
      session: {
        error: 'test error',
        message: 'test message',
      },
    }
    const res = {render: jest.fn()}

    beforeAll(() => {
      mockThisCarController.carService.getRentedCars.mockReturnValue(
        allRentedCarsFakeResult
      )
      getRented.apply(mockThisCarController, [req, res])
    })

    it('calls getRentedCars method of car service', () => {
      expect(mockThisCarController.carService.getRentedCars).toBeCalledTimes(1)
    })

    it('renders car-list with notifications', () => {
      expect(res.render).toBeCalledWith('car/view/car-list', {
        data: {
          cars: allRentedCarsFakeResult,
          error: req.session.error,
          message: req.session.message,
        },
      })
    })

    it('cleans the session', () => {
      expect(
        mockThisCarController.cleanSessionErrorsAndMessages
      ).toBeCalledWith(req.session)
    })

    afterAll(jest.clearAllMocks)
  })

  describe('GET: get car by id', () => {
    const carId = 1
    const oneCarFakeResult = 'car'
    const req = {
      params: {
        id: carId,
      },
      session: {
        error: 'test error',
        message: 'test message',
      },
    }
    const res = {
      render: jest.fn(),
    }

    beforeAll(() => {
      mockThisCarController.carService.getById.mockReturnValue(oneCarFakeResult)
      getById.apply(mockThisCarController, [req, res])
    })

    it('calls getById method of car service', () => {
      expect(mockThisCarController.carService.getById).toBeCalledWith(carId)
    })

    it('renders view-one-car with notifications', () => {
      expect(res.render).toBeCalledWith('car/view/view-one-car', {
        data: {
          car: oneCarFakeResult,
          error: req.session.error,
          message: req.session.message,
        },
      })
    })

    it('cleans the session', () => {
      expect(
        mockThisCarController.cleanSessionErrorsAndMessages
      ).toBeCalledWith(req.session)
    })

    afterAll(jest.resetAllMocks)
  })
})
