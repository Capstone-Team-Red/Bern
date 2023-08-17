const Secret_Key = require('../db')
const router = require('express').Router();
const stripe = require('stripe')(Secret_Key);

router.post('/process-payment', async (req, res) => {
  try {
    const { paymentMethodId, cartTotal } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: cartTotal,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
