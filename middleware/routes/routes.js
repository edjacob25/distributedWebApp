var cart = require('../modules/cart');
var comm = require('../modules/communication');
var express = require('express');
var router = express.Router();
var APIKEY = "123456hola";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: "do something"});
});


router.post('/login', function(req, res, next) {
    if (req.body.key === APIKEY ) {
        comm.login(req.body.user, req.body.pass, function(resp){
            res.json({result: resp});
        });
    }
    else{
        res.json({result: "API_KEY_FAIL"});
    }
});


router.post('/logout', function(req, res, next){
    var result = "API_KEY_FAIL";
    if (req.body.key === APIKEY ) {
        cart.deleteCart(req.body.session_id);
    }
    res.json({result: result});
});


router.get('/getCart', function(req, res, next){
    var result = "API_KEY_FAIL";
    if (req.body.key === APIKEY ) {
        result = cart.getItemsFromCart(req.body.session_id);
    }
    res.json({result: result});
});


router.post('/addToCart', function(req, res, next){
    var result = "API_KEY_FAIL";
    if (req.body.key === APIKEY ) {
        cart.addItemToCart(req.body.session_id, req.body.product_id);
    }
    res.json({result: result});
});


router.delete('/deleteFromCart', function(req, res, next){
    var result = "API_KEY_FAIL";
    if (req.body.key === APIKEY ) {
        cart.deleteItemFromCart(req.body.session_id, req.body.product_id);
    }
    res.json({result: result});
});


router.post('/buyCart', function(req, res, next){
    var result = "API_KEY_FAIL";
    if (req.body.key === APIKEY ) {
        cart.deleteCart(req.body.session_id);
    }
    res.json({result: result});
});


module.exports = router;