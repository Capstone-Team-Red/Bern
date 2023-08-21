const router = require('express').Router()
const Renter = require('../db/models/Renter');
module.exports = router

// Route to get all renters
router.get('/', async (res, next) => {
  try {
    const renters = await Renter.findAll()
    res.json(renters)
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const renter = await Renter.findByPk(id, {
      attributes: ['id', 'username', 'email', 'role', 'firstname', 'lastname']
    });
    
    if(renter) {
      res.json(renter);
    } else {
      res.status(404).json({ error: 'Renter not found' })
    }
  } catch (err) {
    next(err)
  }
});

router.post("/", async (req, res, next) => {
  try {
    newRenter = await Renter.create(req.body);
    res.send(newRenter);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, firstname, lastname, zipcode } = req.body;

    const renter = await Renter.findByPk(id);
    if (!renter) {
      return res.status(404).json({ error: 'Renter not found' });
    }

    await renter.update({ email, firstname, lastname, zipcode });

    res.json({ message: 'Renter data updated successfully' })

  } catch (err) {
    next(err);
  }
});