const fs = require('fs');
const deleteFile = require('./delete')
const JSONStream = require('JSONStream');
const {encryptPasswordSync} = require('./encrypt');
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
           if(data.username == username){
               let hash = encryptPasswordSync(password);
               console.log(hash);
               data.password = hash;
               result = data;
           }
        });

    transformStream.pipe(writeTransformStream);
    inputStream.on('end', function(){
        if(!result.hasOwnProperty('username')){
            fs.unlink(temp, function(err) {
                if(err) throw err;
            })
            console.log("user doesn't exist");
        } else {
            fs.unlink(filename, function(err) {
                if(err) throw err;
            });
            fs.rename(temp, filename, (err) => {
                if(err) throw err;
                console.log("password updated for", result.username);
            })
        }
    })
}