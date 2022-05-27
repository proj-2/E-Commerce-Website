const router = require("express").Router();

const apiRoutes = require("./api");
const startUpRoutes = require("./startUpRoutes")

router.use("/api", apiRoutes);
router.use("/", startUpRoutes)

module.exports = router;