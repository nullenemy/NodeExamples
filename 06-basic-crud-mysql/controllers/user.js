const {encryptPasswordSync, comparePasswordSync} = require('../encrypt');
const FLAG = {
    USER_EXISTS:  0,
    USER_DOES_NOT_EXIST : 1,
    USER_PASSWORD_TEST_FAILED : 2,
}
const util = require('util');
const controller = {
    find(con, user) {
        return new Promise((resolve, reject) => {
            con.query("SELECT * FROM users WHERE name = ? OR email = ?", [user.name, user.email], function(err, result, fields) {
                if(err) reject(err);
                if(result.length == 1){
                    let test = comparePasswordSync(user.password, result[0].password.toString());
                    let flag = test? FLAG.USER_EXISTS : FLAG.USER_PASSWORD_TEST_FAILED;
                    let data = {result, flag};
                    resolve(data);
                } else {
                    let flag = FLAG.USER_DOES_NOT_EXIST;
                    let data = {result, flag};
                    resolve(data);
                }
            });
        })
    },
    add(con, user) {
        this.find(con, user).then((data) => {
            let flag = data.flag;
            switch(flag) {
                case FLAG.USER_DOES_NOT_EXIST:
                    con.query(`INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${encryptPasswordSync(user.password)}')`, function(err, result) {
                        if (err) throw err;
                        console.log("user added");
                        con.end();
                    });
                    break;
                case FLAG.USER_EXISTS:
                    console.log("User Exists, Please use another email/name.");
                    con.end();
                    break;
                case FLAG.USER_PASSWORD_TEST_FAILED:
                    console.log("Password incorrect. Nice Try!!!");
                    con.end();
                    break;
            }
        }).catch((err) => {
            throw err;
        });
    },
    delete(con, user) {
        this.find(con, user).then((data) => {
            let flag = data.flag;
            switch(flag) {
                case FLAG.USER_PASSWORD_TEST_FAILED:
                    console.log("Password incorrect. Nice Try!!!");
                    con.end();
                    break;
                case FLAG.USER_DOES_NOT_EXIST:
                    console.log("User does not exist.");
                    con.end();
                    break;
                case FLAG.USER_EXISTS:
                    con.query("DELETE FROM users WHERE name = ? OR email = ?", [user.name, user.email], function(err, result) {
                        if (err) throw err;
                        console.log("User deleted");
                        con.end();
                    })
                    break;
            }
        }).catch((err) => {
            throw err;
        });
    },
    update(con, user, newPassword) {
        this.find(con, user).then((data) => {
            let flag = data.flag;
            switch(flag) {
                case FLAG.USER_PASSWORD_TEST_FAILED:
                    console.log("Password incorrect. Nice Try!!!");
                    con.end();
                    break;
                case FLAG.USER_DOES_NOT_EXIST:
                    console.log("User does not exist.");
                    con.end();
                    break;
                case FLAG.USER_EXISTS:
                    let hash = encryptPasswordSync(newPassword);
                    con.query(`UPDATE users SET password = '${hash}' WHERE email = '${user.email}'`, function(err, result) {
                        if (err) throw err;
                        console.log("User updated");
                        con.end();
                    })
                    break;
            }
        })
      
    },

}


module.exports =  controller;