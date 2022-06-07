const User = require('../models/User');

const userData = [
    {
        first_name: 'Ron',
        last_name: 'Coleman',
        email: 'ron.coleman@example.com',
        password: 'coleman',
        currency: 'CAD',
        verified: 'true'
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
    {
        first_name: 'Siusan',
        last_name: 'Bainbridge',
        email: 'sbainbridge0@example.com',
        password: 'bainridge',
        currency: 'CAD'
    },
    {
        first_name: 'Ginni',
        last_name: 'Larkings',
        email: 'larkings@example.com',
        password: 'larkings',
        currency: 'USD'
    },
    {
        first_name: 'Laurena',
        last_name: 'Danieli',
        email: 'danielid@example.com',
        password: 'danieli',
        currency: 'CAD'
    },
    {
        first_name: 'Galina',
        last_name: 'Gentreau',
        email: 'gentreau@example.com',
        password: 'gentreau',
        currency: 'USD'
    },
    {
        first_name: 'Vince',
        last_name: 'Pinchen',
        email: 'pinchen@example.com',
        password: 'pinchen',
        currency: 'USD'
    },
    {
        first_name: 'Meryl',
        last_name: 'Brafield',
        email: 'brafield@example.com',
        password: 'brafield',
        currency: 'GBP'
    },
    {
        first_name: 'Britt',
        last_name: 'Lovelace',
        email: 'lovelace@example.com',
        password: 'lovelace',
        currency: 'USD'
    },
]

const seedUser = () => User.bulkCreate(userData, { individualHooks: true })

module.exports = seedUser