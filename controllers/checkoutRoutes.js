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
  User.findAll({
    where: {
      id: req.session.user_id,
    },
    attributes: ["id", "email"],
    include: {
      model: Product,
      attributes: ["id", "name", "price"],
      through: Order,
      as: "product_order",
    },
  })
    .then((orderData) => {
      const initialOrderData = orderData.map((order) =>
        order.get({ plain: true })
      )[0].product_order;
      const orders = initialOrderData.map((order) => ({
        ...order,
      }));
      console.log(orderData);
      res.render("checkout", { orders, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
