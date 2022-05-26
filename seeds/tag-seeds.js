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
    }
]

const seedTags = () => Tag.bulkCreate(tagData)

module.exports = seedTags