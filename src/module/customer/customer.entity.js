require('./types/customer.dto')
module.exports = class Customer {
  /**
   * @param {{
   *  id?: number,
   *  name: string,
   *  lastname: string,
   *  documentType: string,
   *  nroDocument: string,
   *  nationality: string,
   *  address: string,
   *  phoneNumber: string,
   *  email: string,
   *  birthdate: string,
   *  active?: (1 | 0),
   *  createdAt?: Date,
   *  updatedAt?: Date
   * }} customerInfo 
   */
  constructor(customerInfo){
    this.id = customerInfo.id
    this.name = customerInfo.name
    this.lastname = customerInfo.lastname,
    this.documentType = customerInfo.documentType,
    this.nroDocument = customerInfo.nroDocument,
    this.nationality = customerInfo.nationality,
    this.address = customerInfo.address,
    this.phoneNumber = customerInfo.phoneNumber,
    this.email = customerInfo.email,
    this.brithDate = customerInfo.birthdate,
    this.active = customerInfo.active,
    this.createdAt = customerInfo.createdAt,
    this.updatedAt = customerInfo.updatedAt
  }

  static getLeagalAgeToDrive (){
    return 18
  }

}