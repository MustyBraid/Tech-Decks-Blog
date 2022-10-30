const router = require("express").Router();
const { Post } = require("../../models");

router.get("/", async (req, res) => {
  const posts = await Post.findAll({ raw: true });
  res.json(posts);
});

router.post("/", async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
