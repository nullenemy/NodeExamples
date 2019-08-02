const fs = require('fs');
const JSONStream = require('JSONStream');
let result = {};
module.exports = function(filename, username, password) {
    const transformStream = JSONStream.parse("*");
    const inputStream = fs.createReadStream(filename);
    inputStream
        .pipe(transformStream)
        .on('data', function(data) {
            if(data.username == username) {
                result = data;
            }
        })
        .on('end', function() {
            console.log(result);
            if(!result.hasOwnProperty('username')){
                console.log("user doesn't exist");
            }
            else if(result.password != password){
                console.log("password is not correct.");
            } else {
                console.log("Welcome back", result.username);
            }
        });
}