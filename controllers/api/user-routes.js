const router = require("express").Router();
const { User, Product, Category, Tag, ShippingProvider, ProductTag } = require("../../models");

router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email', 'password', 'currency']
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;