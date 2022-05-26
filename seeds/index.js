const seedUser = require("./user-seeds");
const seedCategories = require("./category-seeds");
const seedProducts = require("./product-seeds");
const seedTags = require("./tag-seeds")
const seedProductTags = require("./product-tag-seeds")
const seedShipping = require("./shippingprovider-seeds")

const sequelize = require("../config/connection");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log("DATABASE SYNCED")

    await seedUser()
    console.log("SEEDED USERS")

    await seedCategories()
    console.log("CATEGORIES SEEDED")

    await seedProducts()
    console.log("PRODUCTS SEEDED")

    await seedTags()
    console.log("TAGS SEEDED")

    await seedProductTags()
    console.log("PRODUCT TAGS SEEDED")

    await seedShipping()
    console.log("SHIPPING SEEDED")

    process.exit(0)
}

seedAll()