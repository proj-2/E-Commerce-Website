const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ShippingProvider = require("./ShippingProvider");
const ProductTag = require("./ProductTag")

User.hasMany(Product, {
    foreignKey: 'user_id'
});

Product.belongsTo(User, {
    foreignKey: 'user_id'
});

Product.hasOne(ShippingProvider, {
    foreignKey: 'shipping_provider_id'
});

Category.hasMany(Product, {
    foreignKey: 'category_id'
});

Product.belongsTo(Category, {
    foreignKey: 'category_id'
});

Product.belongsToMany(Tag, {
    through: ProductTag,
    as: 'tags',
    foreignKey: 'product_id'
})

Tag.belongsToMany(Product, {
    through: ProductTag,
    as: 'product',
    foreignKey: 'tag_id'
})

module.exports = {
    User, Product, Category, Tag, ShippingProvider, ProductTag
}