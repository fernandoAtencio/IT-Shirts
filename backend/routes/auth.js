const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.json("Estas en auth");
});
module.exports = router;
