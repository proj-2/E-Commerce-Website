const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag, Order, Wishlist, History } = require("../../../models");

// import validation function
const validation = require("../../../utils/validation");

// get order list by user id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: ['id', 'first_name', 'last_name', 'email', 'password', 'currency'],
        include: [
            {
                model: Product,
                attributes: ['id', 'name', 'description', 'price', 'origin', 'SKU'],
                through: Order,
                as: 'product_order'
            }
        ],
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", validation, (req, res) => {
    Order.create({
        product_id: req.body.product_id,
        user_id: req.session.user_id
    })
        .then(orderData => res.json(orderData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
