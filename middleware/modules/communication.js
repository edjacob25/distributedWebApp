/**
 * Created by jacob on 12/02/2016.
 */
var request = require("request");
var APIKEY = "s3rv1d0r";
var url = require('url');

var operations = {
    login: function (user, pass, callback) {
        var options = {
            url:'http://192.168.0.110:5203/checkUser',
            form: {
                key: APIKEY,
                email: user,
                pass: pass
            }
        };
        request.post(options,function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(JSON.parse(body)["message"]);
            }});
    },
    register: function(email, pass, name, address, image_route, callback){
        var options = {
            url:'http://192.168.0.110:5203/insertUser',
            form: {
                key: APIKEY,

                email: email,
                pass: pass,
                name: name,
                address: address,
                image_route: image_route
            }
        };
        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body);
            }
        });
    },

    getProducts : function(callback){
        var options = {
            url:'http://192.168.0.110:5203/listProducts',
            form: {
                key: APIKEY
            }
        };
        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body);
            }
        });
    },
    getProduct : function(product_id, callback){
        var options = {
            url:'http://192.168.0.110:5203/displayProduct',
            form: {
                key: APIKEY,
                product_id: product_id
            }
        };
        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body);
            }
        });
    }
};

module.exports = operations;