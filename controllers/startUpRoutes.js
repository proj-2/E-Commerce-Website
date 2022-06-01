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
            const products = productData.map(product => product.get({ plain: true }))
            res.render("search-results", { products, loggedIn: req.session.loggedIn })
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
            const products = productData.map(product => product.get({ plain: true }))
            res.render("search-results", { products, loggedIn: req.session.loggedIn })
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
            const products = productData.map(product => product.get({ plain: true }))
            res.render("search-results", { products, loggedIn: req.session.loggedIn })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get("/order/product/:id", validation, (req, res) => {
    Order.create({
        product_id: req.params.id,
        user_id: req.session.user_id
    })
        .then(orderData => {
            console.log(orderData)
        })
})

module.exports = router;
