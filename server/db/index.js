const db = require('./db')
const Users = require('./models/Users')
const Products = require('./models/Products')
const Orders = require('./models/Orders')
const OrderProducts = require('./models/OrderProducts')

Users.hasMany(Orders)
Orders.belongsTo(Users)

Orders.hasMany(OrderProducts)
OrderProducts.belongsTo(Orders)

Products.hasMany(OrderProducts)
OrderProducts.belongsTo(Products)

module.exports = {
  db,
  Users,
  Products,
  Orders,
  OrderProducts
}
