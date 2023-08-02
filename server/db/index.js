const db = require("./db");
const Users = require("./models/Users");
const Renter = require("./models/Renter")
const Listings = require("./models/Listings");
const Orders = require("./models/Orders");
const OrderListings = require("./models/OrderListings");

Users.hasMany(Orders);
Orders.belongsTo(Users, { foreignKey: "userId" });

Renter.hasMany(Listings);
Listings.belongsTo(Renter, { foreignKey: "renterId" });

Users.hasMany(Listings, { foreignKey: "userListingId" });
Listings.hasMany(Users, { foreignKey: "userListingId" });

Orders.hasMany(OrderListings);
OrderListings.belongsTo(Listings, { foreignKey: "listingId" });

Listings.hasMany(OrderListings);
OrderListings.belongsTo(Orders, { foreignKey: "orderId" });

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