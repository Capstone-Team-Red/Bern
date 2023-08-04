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

// Route to get all of logged-in Renter's listings
router.get("/:id/renterListings", async (req, res, next) => {
  const renterId = req.params.id;
  try {
    const listings = await Listings.findAll({ where: { renterId } });
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

router.put("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, classtype, address, city, state, zipcode, date, time, price, stock } = req.body;

    const listing = await Listings.findByPk(id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    await listing.update({ name, classtype, address, city, state, zipcode, date, time, price, stock });

    res.json({ message: 'Listing data updated successfully' })

  } catch (err) {
    next(err);
  }
});

router.post("/:id/add", async (req, res, next) => {
  try {
    const { name, classtype, address, city, state, zipcode, date, time, price, stock } = req.body;
    const renterId = req.params.id

    const newListing = await Listings.create({
      name, classtype, address, city, state, zipcode, date, time, price, stock, renterId
    });
    res.json(newListing);
  } catch (err) {
    next(err);
  }
});
