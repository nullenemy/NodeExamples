const init = require('./init');
const create = require('./create')
const update = require('./update')
const deleteF = require('./delete')
const login = require('./login')
const {encryptPassword, comparePassword} = require('./encrypt');
const method = process.argv[2];
const filename = process.argv[3];
const username = process.argv[4];
const password = process.argv[5];
if(!filename) {
    console.error("you need to specify a filename to create");
    return;
}



const admin = {
    id: 0,
    username: "admin",
    password: "123456"
}

const database = [];

switch(method) {
    case "init":
        encryptPassword(admin.password, function(err, hash){
            admin.password = hash;
            database.push(admin);
            init(filename, JSON.stringify(database));
        })
        break;
    case "create":
        create(filename, username, password);
        break;
    case "update":
        update(filename, username, password);
        break;
    case "delete":
        deleteF(filename, username, password);
        break;
    case "login":
        login(filename, username, password);
    default:
        break;
}