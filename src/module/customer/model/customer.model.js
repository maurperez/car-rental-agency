const {Model, DataTypes} = require('sequelize')

module.exports = class CustomerModel extends Model {
  /**
   * @param {Sequelize} sequelizeInstance
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
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      documentType: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      documentNumber: {
        type: DataTypes.TEXT,
        allowNull: false
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
        allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      birthdate: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date().toISOString()
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date().toISOString(),
      }
    }, {
      sequelize: sequelizeInstance,
      tableName: 'customers',
      modelName: 'Customer',
      timestamps: false
    })
  }
}