const Category = require("../models/Category")

const categoryData = [
    {
        name: 'Hardware'
    },
    {
        name: 'Software'
    }
]

const seedCategories = () => Category.bulkCreate(categoryData)

module.exports = seedCategories;
