const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag } = require("../../models");

router.get('/', (req, res) => {
    Category.findAll({
        attributes: ['id', 'category_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'name', 'description', 'price', 'SKU']
            }
        ]
    })
        .then(categoryData => res.json(categoryData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

module.exports = router;