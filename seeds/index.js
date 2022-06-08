const seedUser = require("./user-seeds");
const seedCategory = require("./category-seeds")
const seedProducts = require("./product-seeds");
const seedTags = require("./tag-seeds")
const seedProductTags = require("./product-tag-seeds")
const seedShipping = require("./shippingprovider-seeds")
const seedOrder = require("./order-seeds")
const seedWishlist = require("./wishlist-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUser();

    await seedShipping();

    await seedCategory();

    await seedProducts();

    await seedOrder();

    await seedTags();

    await seedProductTags();

    await seedWishlist();

    process.exit(0);
}

seedAll()