const router = require('express').Router()
const {Users} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    newUser = await Users.create(req.body);
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});
