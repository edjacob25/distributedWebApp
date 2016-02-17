/**
 * Created by oscar on 14/02/16.
 */
var http = require('http');

var exports = module.exports = {};

exports.API_KEY = "123456hola";

//Used to sent JSon data to the middleware
exports.requestServer = function(data, path, method, response){
    var options = {
        host: "192.168.0.106",
        port: 5201,
        path: '/'+path,
        method: method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var myReq = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (responseData) {
            response(responseData);
        });
    });

    myReq.write(data);
    myReq.end();
};

module.exports = exports;