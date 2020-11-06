const Customer = require('../customer.entity')

/** @param {import('../model/customer.model') } customerInstance */
const mapFromDbToEntity = (customerInstance) => {
  return new Customer({
    id: customerInstance.id,
    name: customerInstance.name,
    lastname: customerInstance.lastname,
    documentType: customerInstance.documentType,
    documentNumber: customerInstance.documentNumber,
    nationality: customerInstance.nationality,
    address: customerInstance.address,
    phoneNumber: customerInstance.phoneNumber,
    email: customerInstance.email,
    birthdate: customerInstance.birthdate,
    active: customerInstance.active,
    createdAt: customerInstance.createdAt,
    updatedAt: customerInstance.updatedAt
  })
}

/** @param {customerFromHttpRequest} plainCustomer*/
const mapFromHttpRequestToEntity  = (plainCustomer) => {
  return new Customer({
    name: plainCustomer.name,
    lastname: plainCustomer.lastname,
    documentType: plainCustomer.documentType,
    documentNumber: plainCustomer.documentNumber,
    nationality: plainCustomer.nationality,
    address: plainCustomer.address,
    phoneNumber: plainCustomer.phoneNumber,
    email: plainCustomer.email,
    birthdate: plainCustomer.birthdate
  })
}

module.exports = {
  mapFromDbToEntity,
  mapFromHttpRequestToEntity
}