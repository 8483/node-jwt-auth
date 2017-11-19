var config = require("./config"); // Delete this line.

module.exports = {
    host     : 'localhost',
    user     : 'root',
    password : config.db_pass, // Put your own database password.
    database : 'db'
}
