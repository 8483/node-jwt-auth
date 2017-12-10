# Node JWT Authentication

This is a simple authentication backend using JSON Web Tokens and a MySQL database. Use **Postman** for testing it.  

If you are planning on using this and pushing it to github, **make sure** to add the `config.js` line in the `.gitignore` file in order to avoid exposing your passwords.  

Required:
- nodejs
- mysql-server
- npm
    - bcrypt
    - body-parser
    - express
    - jsonwebtoken
    - mysql
    - nodemon

## Download
Download the repository to a desired location.  
```bash
git clone https://github.com/8483/node-jwt-auth.git
```

## Install

### Environment

Use this to install Node, NPM and MySQL.  

```bash
sudo apt-get update;
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -;
sudo apt-get install nodejs mysql-server -y;
mysql_secure_installation;
```
If `mysql-server` is not runnig, start the service.

```bash
sudo service mysql start
```

### Database

After installing `mysql-server`, create the database. Will ask for the database password.

```bash
mysql -p < db.sql
```
To check the database, use:
```bash
mysql -p               # Login and prompt for password.
show databases;        # Shows all the databases.
use db;                # Select db as the current database.
show tables;           # Show db's tables.
describe user;         # Show the user table.
select * from user;    # Show all the users.
```

### config.js
The database password should also be used in the `config.js` file in order to be able to connect to the database. You can also change the `token_secret`.  

```javascript
module.exports = {
    "db_pass" : "db", // The database password.
    "token_secret" : "secret" // This is used to sign the tokens.
}
```

### Backend
Install all the dependencies.  
```bash
npm install
```
## Usage

### Start the server
This will start the server on port 3000. To use it, go to `localhost:3000`.

```bash
npm start
```
### Register a user
For this and all following requests, use **Postman** to make them.  

**Request:** POST  
**URL:** http://localhost:3000/api/register  
**Headers (Key: Value):** Content-Type: application/json  
**Body (raw):**
```json
{
	"username" : "john",
	"password" : "pass"
}
```
The password is saved in an encrypted format and it would look like this: `$2a$10$KZEsTwSI.4cfUb1EnjEa0e0mxny4q1ksUSfDwal5R9kE0I0R46JVq`  

### Login
**Request:** POST  
**URL:** http://localhost:3000/api/authenticate   
**Headers (Key: Value):** Content-Type: application/json  
**Body (raw):**
```json
{
	"username" : "john",
	"password" : "pass"
}
```
This will provide a token which is used to gain access to the data. The token would look something like this: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpYXQiOjE1MTExMjcyNjMsImV4cCI6MTUxMTE2MzI2M30.lm3k2rU7EBjTbJ5YeKTuwPxWNQZx23EDo_2ycfTTyWw`  

### Get data
In order to access the data, the `token` should be replaced with the one obtained during the login.  

**Request:** GET  
**URL:** http://localhost:3000/api/users   
**Headers (Key: Value):**
- Content-Type: application/json  
- x-access-token: `token`  

The result from this request would be all the registered users.
```json
[
    {
        "id": 1,
        "username": "john",
        "password_hash": "$2a$10$KZEsTwSI.4cfUb1EnjEa0e0mxny4q1ksUSfDwal5R9kE0I0R46JVq"
    }
]
```
