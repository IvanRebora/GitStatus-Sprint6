'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "users_id"
      });
      Order.hasMany(models.Order_detail, {
        as: "order_details",
        foreignKey: "orders_id"
    });
      Order.belongsTo(models.Shipping, {
        foreignKey: "shippings_id"
      });
      Order.belongsTo(models.State, {
        foreignKey: "states_id"
      });
      Order.belongsTo(models.Payment, {
        foreignKey: "payments_id"
      });
      }
  };
  Order.init({
    number: DataTypes.INTEGER,
    date: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    users_id: DataTypes.INTEGER,
    shippings_id: DataTypes.INTEGER,
    states_id: DataTypes.INTEGER,
    payments_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};