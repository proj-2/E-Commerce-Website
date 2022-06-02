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
  User.findAll({
    where: {
      id: req.session.user_id,
    },
    attributes: ["id", "email", 'currency'],
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

      const getCurrency = orderData.map((order) =>
        order.get({ plain: true })
      )

      const orders = initialOrderData.map((order) => ({
        ...order
      }));

      let totalPrice = 0

      for (let i = 0; i < orders.length; i++) {
        totalPrice += orders[i].price
      }

      // let price1 = totalPrice.toFixed(2)
      let price = Number(totalPrice).toFixed(2)
      let currency = getCurrency[0].currency

      res.render("checkout", {
        currency,
        price,
        loggedIn: true,
        curRate: req.session.curRate,
        currency: req.session.currency
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
