const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag, Order, History } = require("../models");

const validation = require("../utils/validation");

// go to my orders page
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
            through: Order,
            as: 'product_order'
        }
    })
        .then(orderData => {
            // get order product data
            const initialOrderData = orderData.map(order => order.get({ plain: true }))[0].product_order;
            // store curRate, currency properties in each product data
            const orders = initialOrderData.map(order => ({
                ...order,
                curRate: req.session.curRate,
                currency: req.session.currency
            }));

            res.render('order', { orders, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete order data in User data
router.post("/delete", (req, res) => {
    Order.destroy({
        where: {
            user_id: req.session.user_id,
            product_id: req.body.product_id
        }
    })
        .then(res.render('order'))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
