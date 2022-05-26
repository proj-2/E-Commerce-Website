const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag } = require("../../models");

router.get('/', (req, res) => {
    Product.findAll({
        attributes: ['id', 'name', 'description', 'price', 'SKU', 'origin', 'category_id', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['id', 'first_name', 'last_name']
            },
            {
                model: Category,
                attributes: ['id', 'name']
            },
            {
                model: ShippingProvider,
                attributes: ['id', 'name']
            },
            {
                model: Tag,
                attributes: ['id', 'name'],
                through: ProductTag,
                as: 'tags'
            }
        ]
    })
        .then(productData => res.json(productData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;