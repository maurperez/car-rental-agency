module.exports = {
  validCreationHttpReq: {
    name: 'Mauro Alejandro',
    lastname: 'Perez',
    documentType: 'DNI',
    documentNumber: '123456789',
    nationality: 'Argentina',
    address: 'Fake Address 1234',
    phoneNumber: '+54 3496 556173',
    email: 'mauro.fakeemail@gmail.com',
    birthdate: '6-16-2001'
  },
  invalidCreationHttpReq: {
    name: 5,
    lastname: 6546,
    documentType: true,
    documentNumber: false,
    nationality: 123,
    address: 123,
    phoneNumber: 1233,
    email: 'noemail',
    birthdate: '11-2-3500'
  }
}