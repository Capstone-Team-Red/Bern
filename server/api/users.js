const router = require("express").Router();
const Users = require("../db/models/Users");
module.exports = router;

// Route to get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id, {
      attributes: ["id", "username", "email", "role", "firstname", "lastname"],
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    newUser = await Users.create(req.body);
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, firstname, lastname, zipcode } = req.body;

    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({ email, firstname, lastname, zipcode });

    res.json({ message: "User data updated successfully" });
  } catch (err) {
    next(err);
  }
});
