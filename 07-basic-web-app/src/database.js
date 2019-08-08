const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "testuser",
    password: "123456",
    database: "nodeexamplesdb"
});



module.exports = con;

// function init() {
//     con.connect(function(err) {
//         if(err) throw err;
//         console.log("Connected!");
//         con.query("CREATE TABLE users (\
//                                 email VARCHAR(320) NOT NULL, \
//                                 password BINARY(60) NOT NULL, \
//                                 created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \
//                                 modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP \
//                                 )", function(err, result) {
//                 if(err) throw err;
//                 con.end();
//             });
//     })
// }

// init();

