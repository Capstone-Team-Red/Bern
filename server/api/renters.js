const router = require('express').Router()
const Renter = require('../db/models/Renter');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const renters = await Renter.findAll()
    res.json(renters)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    newRenter = await Renter.create(req.body);
    res.send(newRenter);
  } catch (error) {
    next(error);
  }
});
