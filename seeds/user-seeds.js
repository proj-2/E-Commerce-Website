const User = require('../models/User');

const userData = [
    {
        first_name: 'Ron',
        last_name: 'Coleman',
        email: 'ron.coleman@example.com',
        password: 'coleman',
        currency: 'CAD'
    },
    {
        first_name: 'Terrance',
        last_name: 'Jacobs',
        email: 'terrance.jacobs@example.com',
        password: 'jacobs',
        currency: 'USD'
    },
    {
        first_name: 'Frederick',
        last_name: 'Mcdonalid',
        email: 'frederick.mcdonalid@example.com',
        password: 'mcdonalid',
        currency: 'GBP'
    },
]

const seedUser = () => User.bulkCreate(userData, { individualHooks: true })

module.exports = seedUser