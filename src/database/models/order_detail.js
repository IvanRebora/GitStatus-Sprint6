'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order_detail.belongsTo(models.Product, {
        foreignKey: "products_id"
      });
      Order_detail.belongsTo(models.Order, {
        foreignKey: "orders_id"
      });
      }
  };
  Order_detail.init({
    quantity: DataTypes.DECIMAL,
    subtotal: DataTypes.DECIMAL,
    orders_id: DataTypes.INTEGER,
    products_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_detail',
  });
  return Order_detail;
};