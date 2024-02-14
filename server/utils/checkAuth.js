const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
        console.log(token)
        if (token) {
            const decode = jwt.verify(token, 'SECRET_KEY_ERROR_I');
            req.userId = decode.id;
            next(); 
        } else {
            res.status(400).json({ "message": "Нет доступа" });
        }
    } catch (e) {
        res.status(400).json({ "message": "Нет доступа" });
    }
};