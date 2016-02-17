/**
 * Created by oscar on 12/02/16.
 */
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var toMiddle = require("../modules/commToMidd");


router.all('/', function(req, res, next) {
    res.render('login');
});

router.all('/checkLogin', function(req, res, next) {

    //Make sure no empty data arrived
    if(req.body.user === " " || req.body.pass === ""){
        console.log("Error");
        res.redirect('/');
    }else{
        var data = querystring.stringify({
            key: toMiddle.API_KEY,  //Defined in commToMidd
            user: req.body.user,
            pass: req.body.pass
        });

        toMiddle.requestServer(data, "login",'POST',function(response){
            responseJSON = JSON.parse(response);
            if(responseJSON["result"] != "false"){
                req.session.session_id = responseJSON["result"];
                req.session.user = req.body.user;
                console.log(req.session.id);
            }
            res.redirect('/');
        });
    }
});


router.all('/logout', function(req, res, next) {

    var data = querystring.stringify({
        key: toMiddle.API_KEY,      //Defined in commToMidd
        session_id: req.session.session_id
    });
    toMiddle.requestServer(data, "logout",'POST',function(response){
        responseJSON = JSON.parse(response);
        if(responseJSON["result"] == "true") {
            req.session.session_id = undefined;
            req.session.user = undefined;
            req.session.pass = undefined;
            res.redirect('/');
        }else{
            res.render("customError", {message: "Error loging out"});
        }
    });

});

module.exports = router;