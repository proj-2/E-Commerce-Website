const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag, Order, Wishlist, History } = require("../../models");

const validation = require("../../utils/validation")

router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email', 'password', 'currency', 'verificationSent', 'verified']
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: ['id', 'first_name', 'last_name', 'email', 'password', 'currency'],
        include: [
            {
                model: Product,
                attributes: ['id', 'name', 'description', 'price', 'origin', 'SKU']
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

router.get('/order/:id', (req, res) => {
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

router.post("/order", validation, (req, res) => {
    Order.create({
        product_id: req.body.product_id,
        user_id: req.session.user_id
    })
        .then(orderData => {
            res.json(orderData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.post("/history", validation, (req, res) => {
    Order.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['product_id', 'user_id']
    })
        .then(orderData => {
            res.json(orderData)
            const orders = orderData.map(order => order.get({ plain: true }));

            for (let i = 0; i < orders.length; i++) {
                History.create({
                    product_id: orders[i].product_id,
                    user_id: req.session.user_id
                })
                    .then(initialHistoryData => {
                        console.log(initialHistoryData)
                        History.findAll({
                            where: {
                                user_id: req.session.user_id
                            },
                            attributes: ['product_id', 'user_id']
                        })
                            .then(historyData => {
                                const histories = historyData.map(history => history.get({ plain: true }))
                                console.log(histories)
                            })
                            .then(data => {
                                console.log(data)
                                Order.destroy({
                                    where: {
                                        user_id: req.session.user_id
                                    }
                                })
                                    .then(orderData => {
                                        console.log(orderData)
                                    })
                            })
                    })
            }
        })
})

router.post('/', (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        currency: req.body.currency
    })
        .then(userData => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.email = userData.email
                req.session.loggedIn = true

                res.json(userData)
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put("/:id", (req, res) => {
    User.update(req.body, {
        individualHooks: true,
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

router.put("/", (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.session.user_id
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

router.delete("/:id", (req, res) => {
    User.destroy({
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

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user with that email address!' });
                return;
            }

            const validateLogin = userData.validatePassword(req.body.password);

            if (!validateLogin) {
                res.status(401).json({ message: 'Incorrect password!' });
                return;
            }
            console.log(userData)
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.email = userData.email
                req.session.loggedIn = true

                res.json({ user: userData, message: "Successfully logged in!" })
            })
        })
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
})

router.get('/wishlist/:id', (req, res) => {
    User.findOne({
        attributes: ['id', 'first_name', 'last_name', 'email', 'password', 'currency'],
        include: [
            {
                model: Product,
                attributes: ['id', 'name', 'description', 'price', 'origin', 'SKU'],
                through: Wishlist,
                as: 'product_wishlist'
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

router.post("/wishlist", validation, (req, res) => {
    Wishlist.create({
        product_id: req.body.product_id,
        user_id: req.session.user_id
    })
        .then(wishlistData => {
            res.json(wishlistData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;