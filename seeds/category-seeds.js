const Category = require("../models/Category")

const categoryData = [
    {
        category_name: 'Hardware'
    },
    {
        category_name: 'Software'
    }
]

const seedCategory = () => Category.bulkCreate(categoryData)

module.exports = seedCategory;
