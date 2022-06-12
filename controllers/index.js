const router = require("express").Router();

// import routes
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const searchRoutes = require("./searchRoutes");
const profileRoutes = require("./profileRoutes");
const orderRoutes = require("./orderRoutes");
const checkoutRoutes = require("./checkoutRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const orderHistoryRoutes = require("./orderHistory");

// activate routes
// api
router.use("/api", apiRoutes);

// static pages
router.use("/", homeRoutes);
router.use("/search", searchRoutes);
router.use("/profile", profileRoutes);
router.use("/order", orderRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/order-history", orderHistoryRoutes);

module.exports = router;
