/**
 * Created by oscar on 15/02/16.
 */
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var toMiddle = require("../modules/commToMidd");

function setData(req){
    return querystring.stringify({
        key: toMiddle.API_KEY,
        session_id: req.session.session_id
    });
}

//Gets all the products in the cart
router.get('/getCart', function(req, res, next) {
    data = setData(req);
    /*toMiddle.requestServer(data, "getCart",'POST',function(response){
        responseJSON = JSON.parse(response);

        //Case, qhe middleware wnt down and lost session
        if(responseJSON[result] = "false"){
            req.session.session_id = undefined;
            res.redirect('/');
        }else{
            res.render("myCart");
        }
    });*/

    res.render('myCart', {productArray: productArray, showLogged: true});
});

router.all('/addCart', function(req, res, next) {
    data = setData(req);
    data += querystring.stringify({
        key: toMiddle.API_KEY,
        product_id: req.body.product_id
    });

    toMiddle.requestServer(data, "addToCart",'POST',function(response){
        responseJSON = JSON.parse(response);
        if(responseJSON["result"] == "false"){
            res.render("customError",{message: "Couldn't add to cart"})
        }else {
            res.redirect("/");
        }
    });
});

router.get('/deleteFromCart', function(req, res, next) {
    data = setData(req);
    data += querystring.stringify({
        key: toMiddle.API_KEY,
        product_id: req.body.product_id
    });

    toMiddle.requestServer(data, "deleteFromCart",'DELETE',function(response){
        responseJSON = JSON.parse(response);
        res.render("myCart");
    });
});

router.get('/buyCart', function(req, res, next) {
    data = setData(req);
    toMiddle.requestServer(data, "buycart",'POST',function(response){
        responseJSON = JSON.parse(response);
        res.render("myCart");
    });
});

module.exports = router;