const Customer = require('../customer.entity')

/**
 * @param {import('../model/customer.model') } customerInstance 
 */
const mapFromDbToEntity = (customerInstance) => {
  return new Customer({
    id: customerInstance.id,
    name: customerInstance.name,
    lastname: customerInstance.lastname,
    documentType: customerInstance.documentType,
    nroDocument: customerInstance.documentNumber,
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

module.exports = {
  mapFromDbToEntity
}