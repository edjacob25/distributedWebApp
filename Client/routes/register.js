/**
 * Created by oscar on 16/02/16.
 */
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var toMiddle = require("../modules/commToMidd");


module.exports = router;

router.get('/', function(req, res, next) {
    res.render('register');
});

router.all('/registerUser', function(req, res, next) {
    var data = querystring.stringify({
        key: toMiddle.API_KEY,  //Defined in commToMidd
        email: req.body.email,
        pass: req.body.pass,
        name: req.body.name,
        address: req.body.address,
        image_route: req.body.image
    });

    toMiddle.requestServer(data, "registerUser",'POST',function(response){
        responseJSON = JSON.parse(response);
        console.log("Register Response");
        if(responseJSON["message"] == "false"){
            res.render('register',{message: "Invalid User"});
        }else{
            res.redirect('/');
        }
    });
});
