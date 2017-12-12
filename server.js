var express = require("express"); // call express
var app = express();
var bodyParser = require("body-parser"); // define our app using express
var status = require("./routes/status"); // check is server works
var register = require("./routes/register"); // creates token
var authenticate = require("./routes/authenticate"); // creates token
var verify = require("./routes/verify"); // verifies token
var users = require("./routes/users");

// Allow requests from all domains and localhost
app.all("/*", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
});

// Configure app to use bodyParser()
// This will let us get the data from a POST
app
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(status)
    .use(register)
    .use(authenticate)
    .use(verify) // verify token before accessing api
    .use(users)
;

// app.listen(3000);
app.listen(3000, function() {
    console.log(new Date().toISOString() + ": server started on port 3000");
});
