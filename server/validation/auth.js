const { body } = require('express-validator');

const registerValidator = [
    body('email').isEmail(),
    body('login').isLength({ min: 3 }),
    body('password').isLength({ min: 3 })
];

module.exports = {
    registerValidator: registerValidator
};