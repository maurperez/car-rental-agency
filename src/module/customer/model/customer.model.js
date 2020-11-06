const {Model, DataTypes} = require('sequelize')

module.exports = class CustomerModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   */
  static setup(sequelizeInstance){
    CustomerModel.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      lastname: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      documentType: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'document_type'
      },
      documentNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'document_number'
      },
      nationality: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'phone_number'
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      birthdate: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      active: {
        type: DataTypes.NUMBER,
        defaultValue: 1
      },
      createdAt: {
        type: DataTypes.STRING,
        defaultValue: new Date().toISOString(),
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.STRING,
        defaultValue: new Date().toISOString(),
        field: 'updated_at'
      }
    }, {
      sequelize: sequelizeInstance,
      tableName: 'customers',
      timestamps: false
    })
  }
}