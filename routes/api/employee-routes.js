const router = require("express").Router();
const { Employee } = require("../../models/");

router.post("/", async (req, res) => {
  try {
    await Employee.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role_title: req.body.role_title,
      manager_name: req.body.manager_name,
    });
    res.status(200);
    res.send();
  } catch (err) {
    // 400 status code means the server could not understand the request
    console.log("Something about that request went wrong!");
    res.status(400).json(err);
  }
});

router.get("/all", async (req, res) => {
  const employees = await Employee.findAll({ raw: true });
  res.json(employees);
});

router.put("/role/:name", async (req, res) => {
  console.log(req.params.name);
  await Employee.update(
    { role_title: req.body.newTitle },
    {
      where: {
        first_name: req.params.name,
      },
    }
  );
  res.send();
});

module.exports = router;
