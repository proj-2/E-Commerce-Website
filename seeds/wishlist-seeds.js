const Wishlist = require("../models/Wishlist");

const wishlistData = [];

const seedWishlist = () => Wishlist.bulkCreate(wishlistData);

module.exports = seedWishlist;
