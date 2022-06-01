const Order = require("../models/Order")

const orderData = [

]

const seedOrder = () => Order.bulkCreate(orderData);

module.exports = seedOrder