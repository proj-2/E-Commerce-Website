const router = require("express").Router();

const apiRoutes = require("./api");
const startUpRoutes = require("./startUpRoutes")
const profileRoutes = require("./profileRoutes")

router.use("/api", apiRoutes);
router.use("/profile", profileRoutes)
router.use("/", startUpRoutes)

module.exports = router;