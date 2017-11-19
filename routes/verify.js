var express = require("express");
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var router = express.Router();

// How are tokens saved on backend?
// They're not stored server side -- they're issued to the client and the client presents them on each call.
// They're verified because they're signed by the host's own protection key.
// In SystemWeb hosting, that protection key is the machineKey setting from web.config.

router
    .use(function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.token_secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
        // if there is no token, return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

module.exports = router;
