const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ShippingProvider = require("./ShippingProvider");

User.hasMany(Product, {
    foreignKey: 'user_id'
});

Product.belongsTo(User, {
    foreignKey: 'user_id'
})

Category.hasMany(Product, {
    foreignKey: 'product_id'
})

Product.belongsTo(Category, {
    foreignKey: 'product_id'
})

Tag.hasMany(Product, {
    foreignKey: 'product_id'
})

Product.hasMany(Tag, {
    foreignKey: 'product_id'
})

ShippingProvider.belongsTo(Product, {
    foreignKey: 'shipping_provider_id'
})

module.exports = { User, Product, Category, Tag, ShippingProvider }