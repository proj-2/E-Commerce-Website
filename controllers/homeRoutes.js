const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag, Order, History } = require("../models");

// go to homepage
router.get("/", (req, res) => {
    Tag.findAll({
        attributes: ['id', 'name']
    })
        .then(tagData => {
            const tags = tagData.map(tag => tag.get({ plain: true }));

            res.render('home', { loggedIn: req.session.loggedIn, tags });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// go to signup page
router.get("/signup", (req, res) => {
    res.render('sign-up');
});

// go to login page
router.get("/login", (req, res) => {
    res.render('login', { loggedIn: req.session.loggedIn });
});

module.exports = router;
