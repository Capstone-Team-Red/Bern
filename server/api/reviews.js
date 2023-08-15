const router = require("express").Router();
const Reviews = require('../db/models/Reviews');
module.exports = router;

// Route to get all reviews
router.get('/', async (req, res, next) => {
    try {
      const allReviews = await Reviews.findAll();
      res.json(allReviews);
    } catch (error) {
      next(error);
    }
  });
  
  // Route to get a single review by its ID
  router.get('/:id', async (req, res, next) => {
    try {
      const reviewId = req.params.id;
      const review = await Reviews.findByPk(reviewId);
      
      if (!review) {
        return res.status(404).json({ message: 'Currently there are no reviews' });
      }
      
      res.json(review);
    } catch (error) {
      next(error);
    }
  });
  
  // Route to delete a review by its ID
  router.delete('/:id', async (req, res, next) => {
    try {
      const reviewId = req.params.id;
      const review = await Reviews.findByPk(reviewId);
      
      if (!review) {
        return res.status(404).json({ message: 'Currently there are no reviews' });
      }
      
      await review.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      next(error);
    }
  });
  