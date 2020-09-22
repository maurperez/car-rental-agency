const { deleteCar } = require('../delete.action')

const mockThisCarController = {
  ROUT_BASE: '/car',
  cleanSessionErrorsAndMessages : jest.fn(),
  carService: {
    delete: jest.fn()
  }
}

describe('delete method', () => {

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

    beforeAll(() => {
      deleteCar.apply(mockThisCarController, [req, res])
    })

    it('calls delete method of car service with the id', () => {
      expect(mockThisCarController.carService.delete).toBeCalledWith(carID)
    })

    it('sets the correct status code', () => {
      expect(res.status).toBeCalledWith(204)
    })

    it('sets the message notifaction', () => {
      expect(req.session.message).toBeDefined()
      expect(typeof req.session.message).toBe('string')
    })

    it('redirects to the availables cars page', () => {
      expect(res.redirect).toBeCalledWith(`${mockThisCarController.ROUT_BASE}/available`)
    })
  })

})