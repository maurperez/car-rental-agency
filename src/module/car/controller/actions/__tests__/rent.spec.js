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
  beforeEach(() => {
    jest.resetAllMocks()
  })

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

    beforeEach(() => {
      return rent.bind(mockThisCarController)(req, res)
    })

    it('call rent method of car service with the id and days to rent',() => {
      expect(mockThisCarController.carService.rent).toBeCalledWith(carID, Number(req.body["rent-days"]))
    })

    it('set the message notification', () => {
      expect(typeof req.session.message).toBe('string')
    })

    it('redirect to the car page', () => {
      expect(res.redirect).toBeCalledWith(`${mockThisCarController.ROUT_BASE}/${carID}`)
    })
  })

  describe('POST: faill when try to rent a car alredy rented', () => {
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

    beforeEach(() => {
      mockThisCarController.carService.rent.mockImplementation(() => {
        throw carAlredyRentedError
      })

      return rent.bind(mockThisCarController)(req, res)
    })

    it('set error notification', () => {
      expect(req.session.error).toBe(carAlredyRentedError.message)
    })

    it('set status code correctly', () => {
      expect(res.status).toBeCalledWith(405)
    })

    it('redirect to the car page', () => {
      expect(res.redirect).toBeCalledWith(`${mockThisCarController.ROUT_BASE}/${carID}`)
    })
  })

  describe('POST: faill when try to rent a inactive car', () => {
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

    beforeEach(() => {
      mockThisCarController.carService.rent.mockImplementation(() => {
        throw carInactiveError
      })

      return rent.bind(mockThisCarController)(req, res)
    })

    it('set error notification', () => {
      expect(req.session.error).toBe(carInactiveError.message)
    })

    it('set status code correctly', () => {
      expect(res.status).toBeCalledWith(405)
    })

    it('redirect to the car page', () => {
      expect(res.redirect).toBeCalledWith(`${mockThisCarController.ROUT_BASE}/${carID}`)
    })
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

    beforeEach(() => {
      mockThisCarController.carService.rent.mockImplementation(() => {
        throw new Error('unkown error')
      })

      return rent.bind(mockThisCarController)(req, res)
    })

    it('set error notification', () => {
      expect(typeof req.session.error).toBe('string')
    })

    it('set status code correctly', () => {
      expect(res.status).toBeCalledWith(500)
    })

    it('redirect to the car page', () => {
      expect(res.redirect).toBeCalledWith(`${mockThisCarController.ROUT_BASE}/${carID}`)
    })


  })
})