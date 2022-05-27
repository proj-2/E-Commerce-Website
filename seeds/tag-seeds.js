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
    }
]

const seedTags = () => Tag.bulkCreate(tagData)

module.exports = seedTags