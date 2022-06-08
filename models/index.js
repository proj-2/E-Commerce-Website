const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ShippingProvider = require("./ShippingProvider");
const ProductTag = require("./ProductTag");
const Order = require("./Order");
const Wishlist = require("./Wishlist");

User.hasMany(Product, {
    foreignKey: 'user_id'
});

Product.belongsTo(User, {
    foreignKey: 'user_id'
});

Category.hasMany(Product, {
    foreignKey: 'category_id'
});

Product.belongsTo(Category, {
    foreignKey: 'category_id'
});

ShippingProvider.hasMany(Product, {
    foreignKey: 'shipping_id'
})

Product.belongsTo(ShippingProvider, {
    foreignKey: 'shipping_id'
});

Product.belongsToMany(Tag, {
    through: ProductTag,
    as: 'tags',
    foreignKey: 'product_id'
})

Tag.belongsToMany(Product, {
    through: ProductTag,
    as: 'products',
    foreignKey: 'tag_id'
})

Product.belongsToMany(User, {
    through: Order,
    as: 'user_order',
    foreignKey: 'product_id'
});

User.belongsToMany(Product, {
    through: Order,
    as: 'product_order',
    foreignKey: 'user_id'
})

Product.belongsToMany(User, {
    through: Wishlist,
    as: 'user_wishlist',
    foreignKey: 'product_id'
});

User.belongsToMany(Product, {
    through: Wishlist,
    as: 'product_wishlist',
    foreignKey: 'user_id'
});

module.exports = {
    User, Product, Category, Tag, ShippingProvider, ProductTag, Order, Wishlist
}