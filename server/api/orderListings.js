const router = require('express').Router()
const Listings = require('../db/models/Listings');
const OrderListings = require('../db/models/OrderListings');
const Orders = require('../db/models/Orders');
const stripe = require('stripe')('sk_test_51Nb4nULGhuSP9aYSsR8YCQU92pVYdc8FmGzSFctmavVBr73QX42oXNDLgAdDR0qu1ZIDl1JKOil2xV974XXcq3Y500AneSsRKN'); 

module.exports = router

router.post("/", async (req, res, next) => {
  try {
    const newOrderListings = await OrderListings.create(req.body)
    res.send(newOrderListings)
  } catch (error) {
    next(error);
  }
});

router.put('/:id/increase', async (req, res, next) => {
    try {  
      const listing = await OrderListings.findByPk(req.params.id);
      listing.quantity += 1;
      await listing.save();
      res.send(listing);
    } catch (error) {
      next(error);
    }
  });
  
  router.put('/:id/decrease', async (req, res, next) => {
    try {
      const listing = await OrderListings.findByPk(req.params.id);
      listing.quantity -= 1;
      await listing.save();
      res.send(listing);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const listing = await OrderListings.findByPk(req.params.id);
      await listing.destroy();
      res.send(listing);
    } catch (error) {
      next(error);
    }
  });

  //deletes all entries in orderlistings when user checks out
  router.delete('/:id/destroy', async (req, res, next) => {
    try {
      const listings = await OrderListings.findAll({
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

  router.post('/checkout/:id', async (req, res, next) => {
    try {
      const { currentOrderId, paymentMethodId, cartTotal } = req.body;
      const userId = req.params.id

      const stripeAmount = Math.max(cartTotal * 100);
  
      // Create a payment intent with Stripe using the cart total amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount: stripeAmount, // Use the provided cart total amount
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
      });

    // Mark the user's current cart as completed in the backend and create a new cart
    await Orders.update({ completed: true }, {
      where: { id: currentOrderId, userId }
    });
  
      // Handle successful payment
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Payment failed' });
    }
  });