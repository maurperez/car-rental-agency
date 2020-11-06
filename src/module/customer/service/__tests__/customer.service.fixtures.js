const Customer = require("../../customer.entity")

const plainCustomerFromHttpReq = {
  name: 'Mauro',
  lastname: 'Perez',
  documentType: 'DNI',
  documentNumber: '24719686',
  nationality: 'Argentina',
  address: 'Leandro N. Alem 1510, Esperanza, Santa Fe',
  phoneNumber: '+54 3496 556173',
  email: 'mauro.alejandro.perez@outlook.es',
  birthdate: '16-06-2001'
}

const existentCustomer = () => {
  return new Customer({
    id: 5,
    name: 'Pedrito',
    lastname: 'Lopez',
    documentType: 'DNI',
    documentNumber: '12345678',
    nationality: 'Argentina',
    address: 'Rivadavia 2150, Mar del Plata, Buenos Aires',
    phoneNumber: '+54 1324 123456',
    email: 'fake.email@gmail.com',
    birthdate: '25-02-1999',
    active: 1,
    createdAt: "2020-10-05T18:14:40.192Z",
    updatedAt: "2020-10-05T18:14:40.192Z"
  })
}

module.exports = {
  plainCustomerFromHttpReq,
  existentCustomer
}