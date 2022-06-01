const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag, Order } = require("../models/");

const validation = require("../utils/validation")

router.get("/", (req, res) => {
    Tag.findAll({
        attributes: ['id', 'name']
    })
        .then(tagData => {
            const tags = tagData.map(tag => tag.get({ plain: true }))
            res.render('search', { loggedIn: req.session.loggedIn, tags })

        })
})

router.get("/signup", (req, res) => {
    res.render('sign-up')
})

router.get("/login", (req, res) => {
    res.render('login', { loggedIn: req.session.loggedIn })
});

router.get("/search", (req, res) => {
    Tag.findAll({
        attributes: ['id', 'name']
    })
        .then(tagData => {
            const tags = tagData.map(tag => tag.get({ plain: true }))
            res.render('search', { loggedIn: req.session.loggedIn, tags })

        })
})

router.get("/search/category/:num", (req, res) => {
    Product.findAll({
        where: {
            category_id: req.params.num
        },
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
        ]
    })
        .then(productData => {
            const initialProduct = productData.map(product => product.get({ plain: true }))
            const products = initialProduct.map(product => ({ 
                ...product, 
                loggedIn: req.session.loggedIn, 
                curRate: req.session.curRate, 
                currency: req.session.currency 
            }));
            const categoryTitle = products[0].category.category_name
            const title = `Category: ${categoryTitle}`
            res.render("search-results", { products, title })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get("/search/tag/:num", (req, res) => {
    Tag.findOne({
        attributes: ['id', 'name'],
        include: [
            {
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
                through: ProductTag,
                as: 'products'
            }
        ],
        where: {
            id: req.params.num
        }
    })
        .then(tagData => {
            const productData = tagData.dataValues.products
            const initialProduct = productData.map(product => product.get({ plain: true }))
            const products = initialProduct.map(product => ({ 
                ...product, 
                loggedIn: req.session.loggedIn, 
                curRate: req.session.curRate, 
                currency: req.session.currency 
            }));
            const tagTitle = tagData.dataValues.name
            const title = `Tag: ${tagTitle}`
            res.render("search-results", { products, title, loggedIn: req.session.loggedIn })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get("/search/product/:num", (req, res) => {
    Product.findAll({
        where: {
            id: req.params.num
        },
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
        ]
    })
        .then(productData => {
            const initialProduct = productData.map(product => product.get({ plain: true }))
            const products = initialProduct.map(product => ({ 
                ...product, 
                loggedIn: req.session.loggedIn, 
                curRate: req.session.curRate, 
                currency: req.session.currency 
            }));
            res.render("single-product", { products: products, loggedIn: req.session.loggedIn })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.get("/order", validation, (req, res) => {
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
            const initialOrderData = orderData.map(order => order.get({ plain: true }))[0].product_order
            const orders = initialOrderData.map(order => ({
                ...order,
                curRate: req.session.curRate, 
                currency: req.session.currency 
            }));

            res.render('order', { loggedIn: req.session.loggedIn, orders })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.post("/orderDelete", (req, res) => {
    Order.destroy({
        where: {
            user_id: req.session.user_id,
            product_id: req.body.product_id
        }
    })
        .then(res.render('order'))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;
