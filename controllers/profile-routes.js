const router = require("express").Router();
const { User } = require("../models");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  userData = await User.findByPk(id, { raw: true });
  res.render("profile", {
    userData,
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
  });
});

module.exports = router;
