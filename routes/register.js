var express = require("express");
var config = require('../config'); // get our config file
var router = express.Router();
var mysql = require('mysql');
var db = require("../db");
var bcrypt = require("bcrypt");
var pool = mysql.createPool(db);

router
    .post('/api/register', function(req, res) {
        var password_hash = bcrypt.hash(req.body.password, 10, function(err, hash){ // SaltRounds = 10;
            // It's recommended that everything runs inside the bcrypt.hash function.
            pool.getConnection(function(err, connection) {
                if(connection){
                    var query = `INSERT INTO user (id, username, password_hash) VALUES (null, ?, ?);`
                    var params = [req.body.username, hash]; // This is needed because the third argument in connection.query must be a callback.

                    connection.query(query, params, function(err, result) {
                        if (err) {
                            res.status(500).send('Registration failed. Try again.');
                        } else {
                            return res.status(200).send({
                                success: true,
                                message: "Successful registration."
                            });
                        }
                        connection.release();
                    });
                } else {
                    res.status(503).send('Internal server error.');
                }
            });
        });
    });

module.exports = router;
