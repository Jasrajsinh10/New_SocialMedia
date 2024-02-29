const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: function(payload) {
        return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
    },
    verifyToken: function(token, callback) {
        jwt.verify(token, 'your_secret_key', callback);
    }
};