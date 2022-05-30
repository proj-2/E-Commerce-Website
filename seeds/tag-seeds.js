const Tag = require("../models/Tag")

const tagData = [
    {
        name: 'keyboard'
    },
    {
        name: 'npm package'
    },
    {
        name: 'framework'
    },
    {
        name: 'black'
    },
    {
        name: 'monitor'
    },
    {
        name: 'laptop'
    },
    {
        name: 'computer'
    },
    {
        name: 'hard drive'
    },
    {
        name: 'mouse'
    },
    {
        name: 'white'
    },
    {
        name: 'middleware'
    },
    {
        name: 'application software'
    },
    {
        name: 'system software'
    },
    {
        name: 'utility'
    },
    {
        name: 'library'
    },
    {
        name: 'open source'
    },
    {
        name: 'shareware'
    },

]

const seedTags = () => Tag.bulkCreate(tagData)

module.exports = seedTags