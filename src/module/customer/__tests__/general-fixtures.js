module.exports = {
  validCreationHttpReq: {
    name: 'Mauro Alejandro',
    last_name: 'Perez',
    document_type: 'DNI',
    nro_document: '123456789',
    nationality: 'Argentina',
    address: 'Fake Address 1234',
    phone_number: '+54 3496 556173',
    email: 'mauro.fakeemail@gmail.com',
    birth_date: '6-16-2001'
  },
  invalidCreationHttpReq: {
    name: 5,
    last_name: 6546,
    document_type: true,
    nro_document: false,
    nationality: 123,
    address: 123,
    phone_number: 1233,
    email: 'noemail',
    birth_date: '11-2-3500'
  }
}