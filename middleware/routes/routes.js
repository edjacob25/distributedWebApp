var algo = require('../modules/cart');
var express = require('express');
var router = express.Router();
var APIKEY = "123456hola";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: "do something"});
});


router.post('/login', function(req, res, next) {
  var result = "API_KEY_FAIL";
  if (req.body.key === APIKEY ){
    if (Math.random() < 0.5)
      result = "true";
    else
      result = "false";
  }
  console.log(req.body.user);
  console.log(req.body.pass);
  console.log(result);
  res.json({result: result});
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