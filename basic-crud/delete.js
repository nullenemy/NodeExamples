const fs = require('fs');
module.exports = function(filename) {
    fs.unlink(filename, function(err) {
        if(err) throw err;
        console.log('File deleted!');
    })
}