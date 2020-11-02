require('./types/customer.dto')
module.exports.Customer = class Customer {
  /**
   * @param {customerFromHttpRequestDto} customerInfo 
   */
  constructor(customerInfo){
    this.name = customerInfo.name
    this.lastName = customerInfo.lastName,
    this.documentType = customerInfo.documentType,
    this.nroDocument = customerInfo.nroDocument,
    this.nationality = customerInfo.nationality,
    this.address = customerInfo.address,
    this.phoneNumber = customerInfo.phoneNumber,
    this.email = customerInfo.email,
    this.brithDate = customerInfo.birthdate
  }

  static getLeagalAgeToDrive (){
    return 18
  }

}