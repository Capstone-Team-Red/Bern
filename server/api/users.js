const router = require('express').Router()
const {Users} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
