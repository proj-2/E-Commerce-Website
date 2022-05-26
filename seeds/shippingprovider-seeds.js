const ShippingProvider = require("../models/ShippingProvider")

const shippingData = [
    {
        name: 'UPS',
    },
    {
        name: 'FEDEX',
    },
    {
        name: 'DHL',
    }
]

const seedShipping = () => ShippingProvider.bulkCreate(shippingData)

module.exports = seedShipping