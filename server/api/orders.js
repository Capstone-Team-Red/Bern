const router = require('express').Router()
const Users = require('../db/models/Users');
const Listings = require('../db/models/Listings');
const OrderListings = require('../db/models/OrderListings');
const Orders = require('../db/models/Orders');
module.exports = router

router.get('/', async (res) => {
    try {
      const orders = await Orders.findAll({
        include: [Users],
      });
      res.json(orders);
    } catch (err) {
    console.log(err);
    }
  });

router.post("/", async (req, res, next) => {
    try {
      res.send(await Orders.create(req.body));
    } catch (error) {
      next(error);
    }
  });

// this route shows just order completed boolean and user info
router.get("/:id", async (req, res, next) => {
    try {
      const order = await Orders.findByPk(req.params.id, {
        include: [Users, OrderListings]});
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

// this route shows us all listings in a certain order
  router.get("/:id/orderListings", async (req, res, next) => {
    try {
      const listings = await OrderListings.findAll({
        where: { orderId: req.params.id },
        include: [Listings, Orders], 
      });
      res.json(listings);
    } catch (error) {
      next(error);
    }
  });

  //gets all orders for a specific user
  router.get("/user/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      
      const orders = await Orders.findAll({
     where: { userId: id },
        include: [Users, OrderListings],
      });
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

  router.get('/user/:id/incomplete', async (req, res, next) => {
    try {
      const { id } = req.params;
      const incompleteOrders = await Orders.findAll({
        where: { userId: id, completed: false }
      });
      res.json(incompleteOrders);
    } catch (error) {
      next(error);
    }
  });

