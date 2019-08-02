const fs = require('fs');
const deleteFile = require('./delete')
const JSONStream = require('JSONStream');
const {encryptPassword, comparePassword} = require('./encrypt');
let result = {};
let lastUser = {};
let newUser = {};
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
           if(data.username == username){
               result = data;
               inputStream.emit("end");
           }
          
           writeTransformStream.write(data);
           lastUser = data;
        })
        .on('end', function() {
            if(result.hasOwnProperty('username')){
                fs.unlink(temp, function(err) {
                    if(err) throw err;
                })
                console.log("user already existed");
            } else {
                newUser.id = lastUser.id + 1;
                newUser.username = username;
                encryptPassword(password, function(err, hash) {
                    if(err) throw err;
                    newUser.password = hash;
                    writeTransformStream.write(newUser);
                    writeTransformStream.end();
                    fs.unlink(filename, function(err) {
                        if(err) throw err;
                    });
                    fs.rename(temp, filename, (err) => {
                        if(err) throw err;
                        console.log("created new user", newUser.username);
                    })
                })
               
              
               
            }
           
        });
}