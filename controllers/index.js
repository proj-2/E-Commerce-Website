const router = require("express").Router();

// import routes
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const searchRoutes = require("./search-routes");
const profileRoutes = require("./profileRoutes");
const orderRoutes = require("./order-routes");
const checkoutRoutes = require("./checkoutRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const historyRoutes = require("./history-routes");

// api
router.use("/api", apiRoutes);
// static pages
router.use("/", homeRoutes);
router.use("/search", searchRoutes);
router.use("/profile", profileRoutes);
router.use("/order", orderRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/order-history", historyRoutes);

module.exports = router;
