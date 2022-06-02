const router = require("express").Router();
const {
  User,
  Product,
  Category,
  Tag,
  ShippingProvider,
  ProductTag,
  Order,
} = require("../models");

const validation = require("../utils/validation");

router.get("/", validation, (req, res) => {
  console.log(req.session);
  Order.findAll({
    where: {
      user_id: req.session.user_id,
    },
    // attributes: [
    //   "id",
    //   "name",
    //   "description",
    //   "price",
    //   "SKU",
    //   "origin",
    //   "category_id",
    //   "user_id",
    //   "shipping_id",
    //   "stock",
    //   "length",
    //   "width",
    //   "height",
    //   "dimension_units",
    //   "weight",
    //   "weight_units",
    // ],
    // include: [
    //   {
    //     model: User,
    //     attributes: ["id", "first_name", "last_name", "currency"],
    //   },
    //   {
    //     model: Category,
    //     attributes: ["id", "category_name"],
    //   },
    //   {
    //     model: ShippingProvider,
    //     attributes: ["id", "shipping_name"],
    //   },
    //   {
    //     model: Tag,
    //     attributes: ["id", "name"],
    //     through: ProductTag,
    //     as: "tags",
    //   },
    // ],
  })
    .then((productData) => {
      const products = productData.map((product) =>
        product.get({ plain: true })
      );
      console.log(products);
      res.render("checkout", { products, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
