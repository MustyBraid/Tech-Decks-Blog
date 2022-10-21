const router = require("express").Router();
const { Role } = require("../../models");

router.get("/all", async (req, res) => {
  const roles = await Role.findAll({ raw: true }).catch((err) => {
    res.json(err);
  });
  res.json(roles);
});

//TODO: This one is broken
router.get("/:name", async (req, res) => {
  const roleData = await Role.findOne().catch((err) => {
    res.json(err);
  });
  res.json(roleData);
});

router.post("/", async (req, res) => {
  try {
    await Role.create({
      title: req.body.title,
      salary: req.body.salary,
      department: req.body.department,
    });
    res.status(200);
    res.send();
  } catch (err) {
    // 400 status code means the server could not understand the request
    console.log("Something about that request went wrong!");
    res.status(400).json(err);
  }
});

module.exports = router;
