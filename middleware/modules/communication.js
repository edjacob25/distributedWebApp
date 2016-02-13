/**
 * Created by jacob on 12/02/2016.
 */
var APIKEY = "";

var operations = {
    login: function(user, pass, callback) {
        var http = require('http');

        var options = {
            host: 'localhost',
            path: '/checkUser',
            port: '1337',
            method: 'POST'
        };

        var postData = querystring.stringify({
            email : email,
            pass: pass,
            clientKey: APIKEY
        });
        var str;
        var req = http.request(options, function(response) {
            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                callback(str);
            });
        });
        req.write(postData);
        req.end();
    }
};

module.exports = operations;