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
            const categoryTitle = products[0].category.category_name
            const title = `Category: ${categoryTitle}`
            res.render("search-results", { products, title, loggedIn: req.session.loggedIn })
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
            const intialProduct = productData.map(product => product.get({ plain: true }))
            const products = intialProduct.map(product => ({ ...product, loggedIn: req.session.loggedIn }))
            res.render("single-product", { products: products, loggedIn: req.session.loggedIn })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

module.exports = router;
