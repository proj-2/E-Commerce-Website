const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag, Order, Wishlist, History } = require("../../../models");

const validation = require("../../../utils/validation");

// create history data
router.post("/", validation, (req, res) => {
    Order.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['product_id', 'user_id']
    })
        .then(orderData => {
            // get order data
            const orders = orderData.map(order => order.get({ plain: true }));

            // create history data for each order data
            for (let i = 0; i < orders.length; i++) {
                History.create({
                    product_id: orders[i].product_id,
                    user_id: req.session.user_id
                })
                    .then(initialHistoryData => {
                        History.findAll({
                            where: {
                                user_id: req.session.user_id
                            },
                            attributes: ['product_id', 'user_id']
                        })
                            .then(historyData => {
                                // get all the histories
                                const histories = historyData.map(history => history.get({ plain: true }));
                                res.json(histories);
                            })
                            .then(data => {
                                // delete order data
                                Order.destroy({
                                    where: {
                                        user_id: req.session.user_id
                                    }
                                })
                                    .then(orderData => console.log(orderData));
                            });
                    });
            }

            res.json(orderData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
