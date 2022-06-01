const router = require("express").Router();
const userRoutes = require("./user-routes");
const productRoutes = require("./product-routes");
const categoryRoutes = require("./category-routes");
const tagRoutes = require("./tag-routes");
const curRateRoutes = require("./curRate-routes");

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);
router.use("/tag", tagRoutes)
router.use("/curRate", curRateRoutes);


module.exports = router;