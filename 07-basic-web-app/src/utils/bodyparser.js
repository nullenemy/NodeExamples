const FORM_URLENCODED = 'application/x-www-form-urlencoded';
const {parse} = require('querystring');
const bodyparser = {
    parse(request, callback) {
        let contentType = request.headers['content-type'];
        if(contentType == FORM_URLENCODED){
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });
            request.on('end', () => {
                callback(parse(body));
            })
        }
    }

}

module.exports = bodyparser;
