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

router.get("/:id", (req, res) => {
    Category.findOne({
        attributes: ['id', 'category_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'name', 'description', 'price', 'SKU']
            }
        ],
        where: {
            id: req.params.id
        }
    })
        .then(categoryData => {
            if (!categoryData) {
                res.status(404).json({ message: 'No category found with this id' })
                return;
            }
            res.json(categoryData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.post('/', (req, res) => {
    Category.create({
        category_name: req.body.category_name
    })
        .then(categoryData => res.json(categoryData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.put("/:id", (req, res) => {
    Category.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(categoryData => {
            if (!categoryData) {
                res.status(404).json({ message: 'No category found with this id' })
                return;
            }
            res.json(categoryData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.delete("/:id", (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(categoryData => {
            if (!categoryData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(categoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;