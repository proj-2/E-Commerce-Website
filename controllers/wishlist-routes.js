const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag, Order, Wishlist } = require("../models/");

// import validation function
const validation = require("../utils/validation")

// go to wishlist page
router.get("/", validation, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
        },
        attributes: ['id', 'email'],
        include: {
            model: Product,
            attributes: ['id', 'name', 'description', 'price', 'SKU', 'origin', 'category_id', 'user_id', 'shipping_id', 'stock', 'length', 'width', 'height', 'dimension_units', 'weight', 'weight_units'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'currency']
                },
                {
                    model: Category,
                    attributes: ['id', 'category_name']
                },
                {
                    model: ShippingProvider,
                    attributes: ['id', 'shipping_name']
                },
                {
                    model: Tag,
                    attributes: ['id', 'name'],
                    through: ProductTag,
                    as: 'tags'
                }
            ],
            through: Wishlist,
            as: 'product_wishlist'
        }
    })
        .then(wishlistData => {
            // get wishlist data
            const initialWishlistData = wishlistData.get({ plain: true }).product_wishlist;
            // store curRate, currency in each product data
            const wishlists = initialWishlistData.map(item => ({
                ...item,
                curRate: req.session.curRate,
                currency: req.session.currency
            }));

            res.render('wishlist', { wishlists, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete wishlist data
router.post("/delete", (req, res) => {
    Wishlist.destroy({
        where: {
            user_id: req.session.user_id,
            product_id: req.body.product_id
        }
    })
        .then(wishlist => res.json(wishlist))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
