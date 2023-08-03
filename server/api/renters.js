const router = require('express').Router()
const Renter = require('../db/models/Renter');
module.exports = router

// Route to get all renters
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

// Route to get a single renter by ID
router.get("/:id", async (req, res, next) => {
  const renterId = req.params.id;
  try {
    const renter = await Renter.findByPk(renterId);
    if (!renter) {
      return res.status(404).json({ error: "Renter not found" });
    }
    res.json(renter);
  } catch (err) {
    next(err);
  }
});
