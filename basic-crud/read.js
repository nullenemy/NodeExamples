const fs = require('fs');
module.exports = function(filename) {
    fs.readFile(filename, 'utf8', function(err, contents) {
        if(err) throw err;
        console.log("the content is: ", contents);
    })
}