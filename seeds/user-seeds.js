const User = require('../models/User');

const userData = [
    {
        firstName: 'Ron',
        lastName: 'Coleman',
        email: 'ron.coleman@example.com',
        password: 'coleman',
        currency: 'CAD'
    },
    {
        firstName: 'Terrance',
        lastName: 'Jacobs',
        email: 'terrance.jacobs@example.com',
        password: 'jacobs',
        currency: 'USD'
    },
    {
        firstName: 'Frederick',
        lastName: 'Mcdonalid',
        email: 'frederick.mcdonalid@example.com',
        password: 'mcdonalid',
        currency: 'GBP'
    },
]

const seedUser = () => User.bulkCreate(userData, { individualHooks: true })

module.exports = seedUser