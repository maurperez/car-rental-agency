const { deleteCar } = require('../delete.action')

const mockThisCarController = {
  ROUT_BASE: '/car',
  cleanSessionErrorsAndMessages : jest.fn(),
  carService: {
    delete: jest.fn()
  }
}

describe('delete method', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('POST: delete car', () => {
    const carID = 1
    const req = {
      params: {
        id: carID
      },
      session: {}
    }
    const res = {
      status: jest.fn(),
      redirect: jest.fn()
    }

    beforeEach(() => {
      return deleteCar.bind(mockThisCarController)(req, res)
    })

    it('call delete car service method with the id', () => {
      expect(mockThisCarController.carService.delete).toBeCalledWith(carID)
    })

    it('set the correct status code', () => {
      expect(res.status).toBeCalledWith(204)
    })

    it('sets message notifaction', () => {
      expect(req.session.message).toBeDefined()
      expect(typeof req.session.message).toBe('string')
    })

    it('redirect to the availables cars', () => {
      expect(res.redirect).toBeCalledWith(`${mockThisCarController.ROUT_BASE}/available`)
    })
  })

})