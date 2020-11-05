/**
 * @typedef {{
 *  name: string,
 *  lastName: string,
 *  documentType: string,
 *  documentNumber: string,
 *  nationality: string,
 *  address: string,
 *  phoneNumber: string,
 *  email: string,
 *  birthdate: Date
 * }} customerFromHttpRequest
 */

 /**
  * @typedef {{
  *  id: number,
  *  name: string,
  *  lastName: string,
  *  documentType: string,
  *  nroDocument: string,
  *  nationality: string,
  *  address: string,
  *  phoneNumber: string,
  *  email: string,
  *  birthdate: string,
  *  active: (1 | 0),
  *  createdAt: Date,
  *  updatedAt: Date
  * }} customerFromDb
  */