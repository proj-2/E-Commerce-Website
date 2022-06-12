const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag, Order, History } = require("../models");

// import validation function
const validation = require("../utils/validation");

// go to checkout page
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
    .then(orderData => {
      const data = orderData.map((order) => order.get({ plain: true }))[0];
      const orders = orderData.map((order) => order.get({ plain: true }))[0].product_order;
      console.log(data);
      let totalPrice = 0;

      // get total price by adding up each product's price
      for (let i = 0; i < orders.length; i++) {
        totalPrice += orders[i].price;
      };

      
      // let price = Number(totalPrice).toFixed(2);

      res.render("checkout", {
        totalPrice,
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
