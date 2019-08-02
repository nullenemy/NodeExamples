const fs = require('fs');
module.exports = function(filename, content){
    let writeStream = fs.createWriteStream(filename, {flags: 'a'});
    writeStream.on('finish', function() {
        console.log("Finished Updating", filename);
    })
    writeStream.on('error', function(err) {
        throw err;
    })
    writeStream.write("\nA new Message");
    writeStream.end();
}