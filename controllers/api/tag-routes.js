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

router.get("/:id", (req, res) => {
    Tag.findOne({
        attributes: ['id', 'name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'name', 'description', 'price', 'SKU'],
                through: ProductTag,
                as: 'products'
            }
        ],
        where: {
            id: req.params.id
        }
    })
        .then(tagData => {
            if (!tagData) {
                res.status(404).json({ message: 'No category found with this id' })
                return;
            }
            res.json(tagData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.post("/", (req, res) => {
    Tag.create({
        name: req.body.name
    })
        .then(tagData => res.json(tagData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.put("/:id", (req, res) => {
    Tag.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(tagData => {
            if (!tagData) {
                res.status(404).json({ message: 'No category found with this id' })
                return;
            }
            res.json(tagData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.delete("/:id", (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(tagData => {
            if (!tagData) {
                res.status(404).json({ message: 'No category found with this id' })
                return;
            }
            res.json(tagData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router