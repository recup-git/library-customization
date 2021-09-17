"use strict";

const router = require("express-promise-router")();

router.get("/", (req, res) => {
  res.redirect("/categories");
});

exports.preload = router;
