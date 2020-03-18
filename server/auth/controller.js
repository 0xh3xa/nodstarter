const User = require('../api/users/model');
const signToken = require('./index').signToken;

exports.sigin = (req, res, next) => {
    var token = signToken(req.user._id);
    res.json({
        token: token
    });
};
