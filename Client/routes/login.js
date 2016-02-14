/**
 * Created by oscar on 12/02/16.
 */
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var http = require('http');





function reqServer(data, response){

    var options = {
        host: "10.25.201.122",
        port: 5201,
        path: '/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var myReq = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            //console.log("body: " + chunk);
            response(chunk);
        });
    });

    myReq.write(data);
    myReq.end();
};

function createSession(){};

router.all('/', function(req, res, next) {

    var data = querystring.stringify({
        key: "123456hola",
        user: req.body.user,
        pass: req.body.pass
    });

    reqServer(data, function(response){
        responseJSON = JSON.parse(response);
        console.log(responseJSON["result"]);
        //console.log(response);
    });


    res.redirect('/?result=true');
});

module.exports = router;