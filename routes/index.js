const express = require("express");
const router = express.Router();
const authenticationRoutes = require("./authentication");
const userRoutes = require("./user");

router.use("/auth",authenticationRoutes);
router.use("/userCocktails",userRoutes);
module.exports = router;