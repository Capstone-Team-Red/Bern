const Sequelize = require('sequelize')
const db = require('../db')

const Listings = db.define('listings', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  classtype: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: '/images/lifting-default.jpg'
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      notEmpty: true,
      min: 1
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = Listings
