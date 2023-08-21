const db = require("./db");
const Users = require("./models/Users");
const Renter = require("./models/Renter")
const Listings = require("./models/Listings");
const Orders = require("./models/Orders");
const OrderListings = require("./models/OrderListings");
const Reviews = require('./models/Reviews');

Users.hasMany(Orders);
Orders.hasMany(Users);

Renter.hasMany(Listings)
Listings.belongsTo(Renter);

Users.hasMany(Listings);
Listings.hasMany(Users);

Orders.hasMany(OrderListings);
OrderListings.belongsTo(Orders);

Listings.hasMany(OrderListings);
OrderListings.belongsTo(Listings);

Reviews.belongsTo(Users, { as: 'reviewer', foreignKey: 'reviewer_user_id' });
Reviews.belongsTo(Listings, { foreignKey: 'reviewed_entity_id' });

Users.addHook('afterCreate', async (user) => {
  try {
    await Orders.create({
      userId: user.id,
    });
  } catch (err) {
    console.error('Error creating order for user..', err);
  }
});

module.exports = {
  db,
  Users,
  Renter,
  Listings,
  Orders,
  OrderListings,
  Reviews
}