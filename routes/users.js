var express = require("express");
var router = express.Router();
var mysql = require('mysql');
var db = require("../db")
var pool = mysql.createPool(db);

router
    .get("/api/users", function(req, res){
        pool.getConnection(function(err, connection) { // Get connection and pass it.
            if(connection){
                connection.query( 'SELECT * from user', function(err, rows) { // Get query results (rows) and pass them.
                    if (!err){
                        res.send(rows);
                    } else {
                        res.status(500).send('Something went wrong. Try again.');
                    }
                    connection.release();
                });
            } else {
                res.status(503).send('Internal server error.');
            }
        });
    });

module.exports = router;
