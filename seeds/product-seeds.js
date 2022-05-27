const Product = require("../models/Product")

const productData = [
    {
        name: 'Logitech Wireless Combo MK270',
        description: 'The design of this keyboard creates a comfortable typing experience thanks to the low-profile, quiet keys and standard layout with full-size F-keys, number pad, and arrow keys',
        price: 29.99,
        SKU: 123,
        origin: 'Brampton',
        category_id: 1,
        user_id: 1,
        shipping_id: 1,
        stock: 10,
        length: 441,
        width: 139,
        height: 18,
        dimension_units: "mm",
        weight: 498,
        weight_units: "g",
    },
    {
        name: 'Axios',
        description: 'Axios is a simple promise based HTTP client for the browser and node. js. Axios provides a simple to use library in a small package with a very extensible interface. Get Started View on GitHub.',
        price: 9.99,
        SKU: 321,
        origin: 'Toronto',
        category_id: 2,
        user_id: 2,
        shipping_id: 2
    },
    {
        name: 'Django',
        description: 'Django REST framework is a powerful and flexible toolkit for building Web APIs.',
        price: 19.99,
        SKU: 213,
        origin: 'Vancouver',
        category_id: 2,
        user_id: 3,
        shipping_id: 3
    },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;