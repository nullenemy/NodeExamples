const User = require('./models/user');
const Controller = require('./controllers/user');
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
const command = process.argv[2];
const email = process.argv[3];
const name = process.argv[4];
const password = process.argv[5];

const newPassword = process.argv[6];
let user = new User(email,name, password);
switch(command){
    case "init":
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
                con.end();
            });
        })
        break;
    case "add":
        Controller.add(con, user);
        break;
    case "delete":
        Controller.delete(con, user);
        break;
    case "update":
        Controller.update(con, user, newPassword);
        break;
    default:
        break;
}

