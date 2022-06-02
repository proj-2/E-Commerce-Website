const router = require("express").Router();

const apiRoutes = require("./api");
const startUpRoutes = require("./startUpRoutes");
const profileRoutes = require("./profileRoutes");
const checkoutRoutes = require("./checkoutRoutes");

router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);
router.use("/", startUpRoutes);
router.use("/checkout", checkoutRoutes);

module.exports = router;
