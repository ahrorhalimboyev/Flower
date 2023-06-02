const express = require("express");
const router = express.Router();

const flowerRoutes = require("./flower");
const customerRoutes = require("./customers");
const ordersRoutes = require("./orders");

router.use("/flowers", flowerRoutes);
router.use("/customers", customerRoutes);
router.use("/orders", ordersRoutes);

module.exports = router;
