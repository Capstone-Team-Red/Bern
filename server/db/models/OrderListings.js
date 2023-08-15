const Sequelize = require('sequelize')
const db = require('../db')

//this table tells us which products are in which orders
const OrderListings = db.define('orderlistings', {
  // do you need price to be recorded separately here in OrderListings if it's already in the Listings model?
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      notEmpty: true,
      min: 1
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = OrderListings;
