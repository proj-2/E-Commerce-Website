const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag, Order, History } = require("../models");

// import validation function
const validation = require("../utils/validation");

// go to order history page
router.get("/", validation, (req, res) => {
    User.findAll({
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
            through: History,
            as: 'product_history'
        }
    })
        .then(historyData => {
            // get order history product data
            const initialHistoryData = historyData.map(history => history.get({ plain: true }));
            const history = initialHistoryData[0].product_history;

            res.render('order-history', { history, loggedIn: req.session.loggedIn });
        });
});

module.exports = router;
