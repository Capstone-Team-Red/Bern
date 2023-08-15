const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review_text: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  });
  
module.exports = Reviews;
