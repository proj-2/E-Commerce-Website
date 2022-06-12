const router = require("express").Router();
const userRoutes = require("./user-routes");
const orderRoutes = require("./order-routes");
const historyRoutes = require("./history-routes");
const wishlistRoutes = require("./wishlist-routes");

router.use("/", userRoutes);
router.use("/order", orderRoutes);
router.use("/history", historyRoutes);
router.use("/wishlist", wishlistRoutes);

module.exports = router;
