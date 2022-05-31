const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag } = require("../models/");

router.get("/", (req, res) => {
    Tag.findAll({
        attributes: ['id', 'name']
    })
        .then(tagData => {
            const tags = tagData.map(tag => tag.get({ plain: true }))
            res.render('login', { loggedIn: req.session.loggedIn, tags })
        });
    // res.render('login', { loggedIn: req.session.loggedIn })
});

router.get("/signup", (req, res) => {
    res.render('sign-up')
})

// router.get("/search", (req, res) => {
//     Tag.findAll({
//         attributes: ['id', 'name']
//     })
//         .then(tagData => {
//             const tags = tagData.map(tag => tag.get({ plain: true }))
//             res.render('search', { loggedIn: req.session.loggedIn, tags })

//         })
// })

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
            res.render("search", { products, loggedIn: true })
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
                        attributes: ['id', 'first_name', 'last_name']
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
            res.render("search", { products, loggedIn: true })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;
