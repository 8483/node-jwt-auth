var express = require("express");
var router = express.Router();

router
    .get('/', (req, res) => {
        res.send('Server works! The API is at http://localhost:3000/api');
    });

module.exports = router;
