const command = process.argv[2];
const initDB = require('./initDB');
const {encryptPasswordSync} = require('./encrypt');
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "testuser",
    password: "123456",
    database: "nodeexamplesdb"
});

var defaultUser = {
    name: "admin",
    email: "admin@example.com",
    password: "123456"
}

switch(command){
    case "createtable":
        con.connect(function(err) {
            if(err) throw err;
            console.log("Connected!");
            con.query("CREATE TABLE users (\
                        name VARCHAR(255) NOT NULL, \
                        email VARCHAR(320) NOT NULL, \
                        password BINARY(60) NOT NULL, \
                        created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \
                        modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP \
                        )", function(err, result) {
                if (err) throw err;
                console.log("Table created");
                con.end();
            });
        })
        break;
    case "add":
        con.connect(function(err) {
            if(err) throw err;
            console.log("Connected!");
            console.log(`INSERT INTO users (name, email, password) VALUES ('${defaultUser.name}', '${defaultUser.email}', '${encryptPasswordSync(defaultUser.password)}')`);
            con.query(`INSERT INTO users (name, email, password) VALUES ('${defaultUser.name}', '${defaultUser.email}', '${encryptPasswordSync(defaultUser.password)}')`, function(err, result) {
                if (err) throw err;
                console.log("user added");
                con.end();
            });
        })
        break;
}

