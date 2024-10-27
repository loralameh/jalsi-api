const express = require("express");
const fs = require("fs");
const router = express.Router();

// Dynamically load all route files
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js") {
    const route = require(`./${file}`);
    console.log(file);
    console.log(`/${file.replace(".js", "")}`);

    router.use(`/${file.replace(".js", "")}`, route);
  }
});

module.exports = router;
