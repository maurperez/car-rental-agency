const express = require('express')
const {configureExpressSession, configureHomePage, configureNotFoundPage, configureStaticsFiles} = require('../express')

const mockExpressApp = {
  use: jest.fn(),
  get: jest.fn()
}

const mockContainer = {
  get: jest.fn()

}





describe('configure express', () => {

  describe('configureStaticsFiles', () => {
    const sypServeStatic = jest.spyOn(express, 'static')
    beforeAll(() => {
      configureStaticsFiles(mockExpressApp)
    });

    it('serves the folder public', () => {
      expect(mockExpressApp.use).nthCalledWith(1, '/public', expect.anything())
      expect(sypServeStatic).nthCalledWith(1, 'public')
    })

    it('serves bulma-carousel css files', () => {
      expect(mockExpressApp.use).nthCalledWith(2, '/public/css', expect.anything())
      expect(sypServeStatic).nthCalledWith(2, 'node_modules/bulma-carousel/dist/css')
    })

    it('serves bulma csss files', () => {
      expect(mockExpressApp.use).nthCalledWith(3, '/public/css', expect.anything())
      expect(sypServeStatic).nthCalledWith(3, 'node_modules/bulma/css')
    })

    it('serves bulma-carousel js files', () => {
      expect(mockExpressApp.use).nthCalledWith(4, '/public/js', expect.anything())
      expect(sypServeStatic).nthCalledWith(4, 'node_modules/bulma-carousel/dist/js')
    })
    
    afterAll(jest.resetAllMocks)
  })

  describe('configureNotFoundPage', () => {
    beforeAll(() => {
      configureNotFoundPage(mockExpressApp)
    });

    it('sets the callback funtion to send 404 page', () => {
      expect(mockExpressApp.use).toBeCalledWith(expect.any(Function))
    })

    it('the calback function sets the status code to 404 and render not-found-404', () => {
      const cbFunction = mockExpressApp.use.mock.calls[0][0]
      const res = {
        status: jest.fn(),
        render: jest.fn()
      }

      cbFunction({}, res)

      expect(res.status).toBeCalledWith(404)
      expect(res.render).toBeCalledWith('car/view/not-found-404')

    })

    afterAll(jest.resetAllMocks)
  })

  describe('configureHomePage', () => {
    const mockCarController = {
      index: 'car index page'
    }

    beforeAll(() => {
      mockContainer.get.mockReturnValue(mockCarController)
      configureHomePage(mockExpressApp, mockContainer)
    })

    it('uses the container to get the car controller', () => {
      expect(mockContainer.get).toBeCalledWith('CarController')
    })

    it('sets the index car page to "/" route', () => {
      expect(mockExpressApp.get).toBeCalledWith('/', mockCarController.index)
    })

    afterAll(jest.resetAllMocks)
  });

  describe('configureExpressSession', () => {
    beforeAll(() => {
      mockContainer.get.mockReturnValue('Session object')
      configureExpressSession(mockExpressApp, mockContainer)
    });
    
    it('sets the session', () => {
      expect(mockExpressApp.use).toBeCalledWith('Session object')
    })
  })

})