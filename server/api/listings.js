const router = require("express").Router();
const Listings = require('../db/models/Listings');
module.exports = router;

// Route to get all listings
router.get("/", async (req, res, next) => {
  try {
    const listings = await Listings.findAll();
    res.json(listings);
  } catch (err) {
    next(err);
  }
});

// Route to get a single listing by ID
router.get("/:id", async (req, res, next) => {
  const listingId = req.params.id;
  try {
    const listing = await Listings.findByPk(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
  } catch (err) {
    next(err);
  }
});
