const router = require("express").Router();
const Role = require("../../models/role");

router.get("/", async (req, res) => {
  const roleData = await Role.findAll().catch((err) => {
    res.json(err);
  });
  res.json(roleData);
});

router.post("/", async (req, res) => {
  try {
    const roleData = await Role.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(roleData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

module.exports = router;
