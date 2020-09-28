const express = require("express");
const router = express.Router();
const authenticationRoutes = require("./authentication");
const userRoutes = require("./user");

router.use("/api/auth",authenticationRoutes);
router.use("/api/userCocktails",userRoutes);
module.exports = router;