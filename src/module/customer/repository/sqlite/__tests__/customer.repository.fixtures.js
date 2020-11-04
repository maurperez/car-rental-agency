const Customer = require('../../../customer.entity')

module.exports.newCustomer = new Customer({
  name: 'Mauro',
  lastname: 'Perez',
  documentType: 'DNI',
  documentNumber: '24719686',
  nationality: 'Argentina',
  address: 'Leandro N. Alem 1510, Esperanza, Santa Fe',
  phoneNumber: '+54 3496 123456',
  email: 'mauro.alejandro.perez@outlook.es',
  birthdate: '16-06-2001'
})