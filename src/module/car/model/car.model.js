const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class CarModel extends Model {

  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
  */
  static setup(sequelizeInstance){
    CarModel.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      brand: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      model: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      modelYear: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'model_year'
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'image_url'
      },
      mileage: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      color: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      airConditioning: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'air_conditioning'
      },
      numberOfPassengers : {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'number_passengers'
      },
      automatic: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      rented: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      returnDate: {
        type: DataTypes.TEXT,
        field: 'return_date'
      },
      pricePerWeekInCents: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'price_per_week_in_cents'
      },
      pricePerDayInCents: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'price_per_day_in_cents',
      },
      createdAt: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
      }
    }, {
      sequelize: sequelizeInstance,
      modelName: 'Car',
      timestamps: false,
    })
  }
}