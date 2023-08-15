const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));

router.use("/renters", require("./renters"));

router.use("/listings", require("./listings"));

router.use("/orders", require("./orders"));

router.use("/orderListings", require("./orderListings"));

router.use("/reviews", require("./reviews"));

//Error Logging
router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
