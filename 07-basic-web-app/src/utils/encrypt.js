var bcrypt = require('bcrypt');
exports.encryptPassword = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return null;
        bcrypt.hash(password, salt, function(err, hash){
            return callback(err, hash);
        })
    })
}

exports.encryptPasswordSync = function(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

exports.comparePassword = function(plainPass, hashword, callback){
    bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    })
}

exports.comparePasswordSync = function(plainPass, hashword){
    return bcrypt.compareSync(plainPass, hashword)
}
