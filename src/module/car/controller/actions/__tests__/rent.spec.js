const { rent } = require('../rent.action')
const {CarAlredyRented, CarInactive} = require('../../../error/general-errors')

const mockThisCarController = {
  ROUT_BASE: '/car',
  cleanSessionErrorsAndMessages : jest.fn(),
  carService: {
    rent: jest.fn()
  }
}

describe('rent method', () => {
  describe('POST: rent car sucessfully', () => {
    const carID = 1
    const req = {
      params: {
        id: carID
      },
      session: {},
      body: {
        'rent-days': '5'
      }
    }
    const res = {
      redirect: jest.fn()
    }

    beforeAll(() => {
      rent.apply(mockThisCarController, [req, res])
    })

    it('calls rent method of car service with the id and days to rent',() => {
      expect(mockThisCarController.carService.rent).toBeCalledWith(carID, Number(req.body["rent-days"]))
    })

    it('sets the message notification', () => {
      expect(typeof req.session.message).toBe('string')
    })

    it('redirects to the car page', () => {
      expect(res.redirect).toBeCalledWith(`${mockThisCarController.ROUT_BASE}/${carID}`)
    })

    afterAll(jest.resetAllMocks)
  })

  describe('POST: throw an error when try to rent a car alredy rented', () => {
    const carID = 5
    const req = {
      params: {
        id: carID
      },
      session: {},
      body: {
        'rent-days': '5'
      }
    }
    const res = {
      redirect: jest.fn(),
      status: jest.fn()
    }
    const carAlredyRentedError = new CarAlredyRented()

    beforeAll(() => {
      mockThisCarController.carService.rent.mockImplementation(() => {
        throw carAlredyRentedError
      })
      rent.apply(mockThisCarController, [req, res])
    })

    it('sets error notification', () => {
      expect(req.session.error).toBe(carAlredyRentedError.message)
    })

    it('sets status code correctly', () => {
      expect(res.status).toBeCalledWith(405)
    })

    it('redirects to the car page', () => {
      expect(res.redirect).toBeCalledWith(`${mockThisCarController.ROUT_BASE}/${carID}`)
    })

    afterAll(jest.clearAllMocks)
  })

  describe('POST: throw an error when try to rent a inactive car', () => {
    const carID = 5
    const req = {
      params: {
        id: carID
      },
      session: {},
      body: {
        'rent-days': '3'
      }
    }
    const res = {
      redirect: jest.fn(),
      status: jest.fn()
    }
    const carInactiveError = new CarInactive()

    beforeAll(() => {
      mockThisCarController.carService.rent.mockImplementation(() => {
        throw carInactiveError
      })
      rent.apply(mockThisCarController, [req, res])
    })

    it('sets error notification', () => {
      expect(req.session.error).toBe(carInactiveError.message)
    })

    it('sets status code correctly', () => {
      expect(res.status).toBeCalledWith(405)
    })

    it('redirects to the car page', () => {
      expect(res.redirect).toBeCalledWith(`${mockThisCarController.ROUT_BASE}/${carID}`)
    })

    afterAll(jest.resetAllMocks)
  })

  describe('POST: internal server error', () => {
    const carID = 5
    const req = {
      params: {
        id: carID
      },
      session: {},
      body: {
        'rent-days': '3'
      }
    }
    const res = {
      redirect: jest.fn(),
      status: jest.fn()
    }

    beforeAll(() => {
      mockThisCarController.carService.rent.mockImplementation(() => {
        throw new Error('unkown error')
      })

      rent.apply(mockThisCarController, [req, res])
    })

    it('sets error notification', () => {
      expect(typeof req.session.error).toBe('string')
    })

    it('sets status code correctly', () => {
      expect(res.status).toBeCalledWith(500)
    })

    it('redirects to the car page', () => {
      expect(res.redirect).toBeCalledWith(`${mockThisCarController.ROUT_BASE}/${carID}`)
    })

    afterAll(jest.resetAllMocks)

  })
})