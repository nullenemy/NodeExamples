const bodyparser = require('../utils/bodyparser')
const User = require('../model/user');
const Database = require('../database');
const {encryptPasswordSync, comparePasswordSync} = require('../utils/encrypt');

const FLAG = {
    USER_EXISTS:  0,
    USER_DOES_NOT_EXIST : 1,
    USER_PASSWORD_TEST_FAILED : 2,
}

const UserController = {
    find(user) {
        return new Promise((resolve, reject) => {
            Database.query("SELECT * FROM users WHERE email = ?", [user.email], function(err, result, fields) {
                if(err) reject(err);

                if(result && result.length == 1){
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



    handle(request, response) {
        let temp = request.url.split("/");
        let command = temp[temp.length - 1];

        bodyparser.parse(request, (body) => {
            request.body = body;
            switch(command) {
                case 'register':
                    this.register(request, response);
                    break;
            }

        })
    },
    register(request, response) {
        let body = request.body;
        let user = new User(body.email, body.password);
        this.find(user).then((data) => {
            let flag = data.flag;
            switch(flag) {
                case FLAG.USER_DOES_NOT_EXIST:
                    Database.query(`INSERT INTO users (email, password) VALUES ('${user.email}', '${encryptPasswordSync(user.password)}')`, function(err, result) {
                        if (err) throw err;
                        Database.end();
                        response.end("new user created.");
                    });
                    break;
                case FLAG.USER_EXISTS:
                case FLAG.USER_PASSWORD_TEST_FAILED:
                    Database.end();
                    response.end("User Exists, Please use another email/name.")
                    break;
            }
        }).catch(err => {
            throw err;
        });
    },
}


module.exports = UserController;
