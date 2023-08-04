const db = require("./db");
const Users = require("./models/Users");
const Renter = require("./models/Renter")
const Listings = require("./models/Listings");
const Orders = require("./models/Orders");
const OrderListings = require("./models/OrderListings");

Users.hasMany(Orders);
Orders.belongsTo(Users);

Renter.hasMany(Listings)
Listings.belongsTo(Renter);

Users.hasMany(Listings);
Listings.hasMany(Users);

Orders.hasMany(OrderListings);
OrderListings.belongsTo(Listings);

Listings.hasMany(OrderListings);
OrderListings.belongsTo(Orders);

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
  OrderListings
}