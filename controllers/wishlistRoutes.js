const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag, Order, Wishlist } = require("../models/");

const validation = require("../utils/validation")

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
            const initialWishlistData = wishlistData.map(wishlist => wishlist.get({ plain: true }))[0].product_wishlist;
            const wishlist = initialWishlistData.map(wishlist => ({
                ...wishlist,
                curRate: req.session.curRate,
                currency: req.session.currency
            }));

            res.render('wishlist', { loggedIn: req.session.loggedIn, wishlist });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;
