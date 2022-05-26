const ShippingProvider = require("../models/ShippingProvider")

const shippingData = [
    {
        shipping_name: 'UPS',
    },
    {
        shipping_name: 'FEDEX',
    },
    {
        shipping_name: 'DHL',
    }
]

const seedShipping = () => ShippingProvider.bulkCreate(shippingData)

module.exports = seedShipping