

const authController = require('./auth.controller');
const Categories = require('./categories.controller');
const Products  = require('./products.controller');
const User  = require('./user.controller');

module.exports = {
    ...authController,
    ...Categories,
    ...Products,
    ...User
}