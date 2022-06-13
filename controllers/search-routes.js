const router = require('express').Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag, Order, History } = require('../models');

// go to search result (search by categories)
router.get('/category/:num', (req, res) => {
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
            // get product data
            const initialProduct = productData.map(product => product.get({ plain: true }));
            // store loggedIn, curRate, currency in each product data
            const products = initialProduct.map(product => ({
                ...product,
                loggedIn: req.session.loggedIn,
                curRate: req.session.curRate,
                currency: req.session.currency
            }));
            const title = `Category: ${products[0].category.category_name}`

            res.render('search-results', { products, title, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// go to search result (search by categories)
router.get('/tag/:num', (req, res) => {
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
            // get product data
            const productData = tagData.dataValues.products;
            const initialProduct = productData.map(product => product.get({ plain: true }));
            // store loggedIn, curRate, currency in each product data
            const products = initialProduct.map(product => ({
                ...product,
                loggedIn: req.session.loggedIn,
                curRate: req.session.curRate,
                currency: req.session.currency
            }));
            const title = `Tag: ${tagData.dataValues.name}`;

            res.render('search-results', { products, title, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// go to single product page (view product)
router.get('/product/:num', (req, res) => {
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
            // get product data
            const initialProduct = productData.map(product => product.get({ plain: true }));
            // store loggedIn, curRate, currency in each product data
            const products = initialProduct.map(product => ({
                ...product,
                loggedIn: req.session.loggedIn,
                curRate: req.session.curRate,
                currency: req.session.currency
            }));

            res.render('single-product', { products, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
