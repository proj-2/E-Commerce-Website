const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag } = require("../../models");


router.get('/', (req, res) => {
    Tag.findAll({
        attributes: ['id', 'name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'name', 'description', 'price', 'SKU'],
                through: ProductTag,
                as: 'products'
            }
        ]
    })
        .then(tagData => { res.json(tagData) })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

module.exports = router