'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shipping.hasMany(models.Order, {
        as: "orders",
        foreignkey: "shippings_id"
    });    }
  };
  Shipping.init({
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    phone_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shipping',
  });
  return Shipping;
};