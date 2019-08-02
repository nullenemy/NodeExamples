const create = require('./create')
const update = require('./update')
const deleteF = require('./delete')
const read = require('./read')
const method = process.argv[2];
const filename = process.argv[3];
if(!filename) {
    console.error("you need to specify a filename to create");
    return;
}
switch(method) {
    case "create":
        create(filename, "");
        break;
    case "update":
        update(filename, "A new message");
        break;
    case "delete":
        deleteF(filename);
        break;
    case "read":
        read(filename);
    default:
        break;
}