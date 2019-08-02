const fs = require('fs');
module.exports = function(filename, content){
    fs.appendFile(filename, content, function(err){
        if(err) throw err;
        console.log('File is updated successfully');
    })
}