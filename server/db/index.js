const db = require("./db");
const Users = require("./models/Users");
const Listings = require("./models/Listings");
const Orders = require("./models/Orders");
const OrderProducts = require("./models/OrderProducts");

Users.hasMany(Orders);
Orders.belongsTo(Users, { foreignKey: "userId" });

Orders.hasMany(OrderProducts);
OrderProducts.belongsTo(Listings, { foreignKey: "listingId" });

Listings.hasMany(OrderProducts);
OrderProducts.belongsTo(Orders, { foreignKey: "orderId" });

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
  Listings,
  Orders,
  OrderProducts
}