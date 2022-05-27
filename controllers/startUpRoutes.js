const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag } = require("../models/");

router.get("/", (req, res) => {
    res.render('login', { loggedIn: req.session.loggedIn })
});

router.get("/search", (req, res) => {
    res.render('search', { loggedIn: req.session.loggedIn })
})

module.exports = router;
