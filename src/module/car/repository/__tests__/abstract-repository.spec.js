const AbstractCarRepository = require('../abstract-repository')
const AbstractCarRepositoryError = require('../error/abstract-car-repository')
const MethodNotImplemented = require('../error/method-not-implemented')

describe('abstract repository', () => {
  it('throw an error if try to create instance of AbstractCarRepository directly', () => {
    expect(() => new AbstractCarRepository()).toThrow(
      AbstractCarRepositoryError
    )
  })

  it('Allows you to create an instance of a class that inherits from AbstractCarRepository', () => {
    const ConcreteRepository = class extends AbstractCarRepository {}
    const concreteRepoInstance = new ConcreteRepository()

    expect(concreteRepoInstance).toBeInstanceOf(AbstractCarRepository)
    expect(concreteRepoInstance).toBeInstanceOf(ConcreteRepository)
  })

  it('If an unimplemented method is called, it throws an error', () => {
    const ConcreteRepository = class extends AbstractCarRepository {}
    const concreteRepoInstance = new ConcreteRepository()

    expect(concreteRepoInstance.create).toThrow(MethodNotImplemented)
    expect(concreteRepoInstance.update).toThrow(MethodNotImplemented)
    expect(concreteRepoInstance.delete).toThrow(MethodNotImplemented)
    expect(concreteRepoInstance.getById).toThrow(MethodNotImplemented)
    expect(concreteRepoInstance.getAll).toThrow(MethodNotImplemented)
  })
})
