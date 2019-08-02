const fs = require('fs');
module.exports = function(filename) {
    let readStream = fs.createReadStream(filename);
    readStream.on('open', function() {
        readStream.pipe(process.stdout);
    });
    readStream.on('error', function(err) {
        throw err;
    })
    readStream.on('close', function() {
        console.log("\nfinished reading file", filename);
    })
  
}