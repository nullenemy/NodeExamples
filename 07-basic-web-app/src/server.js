const http = require('http');
const fs = require('fs');
const path = require('path');
const UserController = require('./controller/user')
const serve = require('./utils/render')
const hostname = '127.0.0.1';
const port = 3000;

const router = {
    "/users": UserController,
};




const server = http.createServer((request, response) => {
    console.log(request.url.split("/"));

    const method = request.method;
    let route = ""
    Object.keys(router).forEach((key) => {
        let match = request.url.indexOf(key) == 0 ? true : false;
        if(match) {
            route = key;
        }
    })

    if (route == "") {
        var filePath = './public' + request.url;

        if (filePath == './public/') {
            filePath = './public/index.html';
        }
        serve(filePath, response);
    } else {
        router[route].handle(request, response);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
