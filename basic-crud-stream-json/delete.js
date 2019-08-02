const fs = require('fs');
const deleteFile = require('./delete')
const JSONStream = require('JSONStream');
let result = {};
module.exports = function(filename, username, password){
    let temp = "tempfile.json";
    const writeTransformStream = JSONStream.stringify();
    const writeStream = fs.createWriteStream(temp);
    writeTransformStream.pipe(writeStream);
    
    const transformStream = JSONStream.parse("*");
    const inputStream = fs.createReadStream(filename);
    inputStream
        .pipe(transformStream)
        .on('data', function(data) {
           if(data.username == username && data.password == password){
               result = data;
           } else {
               writeTransformStream.write(data);
           }
        })
        .on('end', function() {
            if(!result.hasOwnProperty('username')){
                fs.unlink(temp, function(err) {
                    if(err) throw err;
                })
                console.log("user doesn't exist");
            } else if(result.password != password){
                fs.unlink(temp, function(err) {
                    if(err) throw err;
                })
                console.log("password is not correct");
            } 
            else {
                fs.unlink(filename, function(err) {
                    if(err) throw err;
                });
                fs.rename(temp, filename, (err) => {
                    if(err) throw err;
                    console.log("user deleted", result.username);
                })
            }
            writeTransformStream.end();
        });
}