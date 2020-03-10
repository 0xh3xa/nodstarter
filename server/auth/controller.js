var User = require('../api/users/userModel');
var signToken = require('./auth').signToken;

exports.sigin = (req, res, next) => {
    // req.user will be there from middleware
    // verify user. Then we can just create a token
    // and send it back for the client to consume

    var token = signToken(req.user._id);
    res.json({
        token: token
    });
};
