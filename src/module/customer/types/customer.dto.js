/**
 * @typedef {{
 *  name: string,
 *  lastName: string,
 *  documentType: string,
 *  nroDocument: string,
 *  nationality: string,
 *  address: string,
 *  phoneNumber: string,
 *  email: string,
 *  birthdate: Date
 * }} customerFromHttpRequestDto
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