const router = require('express').Router()
const {Orders, Users, OrderProducts, Listings} = require('../db')
module.exports = router

router.post("/", async (req, res, next) => {
  try {
    const newOrderProduct = await OrderProducts.create(req.body)
    res.send(newOrderProduct)
  } catch (error) {
    next(error);
  }
});

router.put('/:id/increase', async (req, res, next) => {
    try {  
      const listing = await OrderProducts.findByPk(req.params.id);
      listing.quantity += 1;
      await listing.save();
      res.send(listing);
    } catch (error) {
      next(error);
    }
  });
  
  router.put('/:id/decrease', async (req, res, next) => {
    try {
      const listing = await OrderProducts.findByPk(req.params.id);
      listing.quantity -= 1;
      await listing.save();
      res.send(listing);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const listing = await OrderProducts.findByPk(req.params.id);
      await listing.destroy();
      res.send(listing);
    } catch (error) {
      next(error);
    }
  });

  //deletes all entries in orderlistings when user checks out
  router.delete('/:id/destroy', async (req, res, next) => {
    try {
      const listings = await OrderProducts.findAll({
        where: { orderId: req.params.id },
        include: [Listings, Orders], 
      });
      for (let i = 0; i < listings.length; i++) {
        await listings[i].destroy();
      }
      res.send(listings);
    } catch (error) {
      next(error);
    }
  })
