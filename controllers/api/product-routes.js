const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag } = require("../../models");

router.get('/', (req, res) => {
    Product.findAll({
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
        ]
    })
        .then(productData => res.json(productData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.get("/:id", (req, res) => {
    Product.findOne({
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
        where: {
            id: req.params.id
        }
    })
        .then(productData => {
            if (!productData) {
                res.status(404).json({ message: 'No post found with this ID' })
                return
            }
            res.json(productData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.post("/", (req, res) => {
    Product.create({
        user_id: req.session.user_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        SKU: req.body.SKU,
        origin: req.body.origin,
        category_id: req.body.category_id,
        shipping_id: req.body.shipping_id,
        stock: req.body.stock,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height,
        dimension_units: req.body.dimension_units,
        weight: req.body.width,
        weight_units: req.body.weight_units,
        tag_id: req.body.tag_id
    })
        .then((product) => {
            if (req.body.tag_id.length) {
                const productTagData = req.body.tag_id.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id
                    }
                })
                return ProductTag.bulkCreate(productTagData)
            } else if (!req.body.tag_id.length)
                res.status(200).json(product)
        })
        .then(finalProduct => res.json(finalProduct))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.put("/:id", (req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(productData => {
            if (!productData) {
                res.status(404).json({ message: 'No product found with this ID' })
                return
            }
        })
    return ProductTag.findAll({ where: { product_id: req.params.id } })
        .then(productTagData => {

        })

});

router.delete("/:id", (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(productData => res.json(productData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})



module.exports = router;