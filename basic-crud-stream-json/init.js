var fs = require('fs');
module.exports = function(filename, content) {
    fs.writeFile(filename, content, function(err) {
        if(err) throw err;
        console.log("database initiated.");
    });
}