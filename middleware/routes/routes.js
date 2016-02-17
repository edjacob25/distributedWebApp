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
            if (resp == "true"){
                var session_id = (Math.floor((Math.random() * 1000000) + 1) + "");
                cart.createCart(session_id);
                res.json({result: session_id});
            }
            else {
                res.json({result: "false"});
            }
            res.end();
        });
    }
    else{
        res.json({result: "API_KEY_FAIL"});
        res.end();
    }
});

router.post('/logout', function(req, res, next){
    var result = "API_KEY_FAIL";
    if (req.body.key === APIKEY ) {
        cart.deleteCart(req.body.session_id);
        result = "true";
    }
    res.json({result: result});
});

router.post('/addToCart', function(req, res, next){
    var result = "API_KEY_FAIL";
    if (req.body.key === APIKEY ) {
        cart.addItemToCart(req.body.session_id, req.body.product_id);
        result = "true";
    }
    res.json({result: result});
});

//Falta pedir a Diego
router.post('/getCart', function(req, res, next){
    if (req.body.key === APIKEY){
        cart.getItemsFromCart(req.body.session_id, function(data){
            console.log(data);
            if (data === undefined){
                data = "false";
            }
            res.json({"ms": data});
        });
    }
    else{
        res.json({message: "API_KEY_FAIL"});
    }
});

router.delete('/deleteFromCart', function(req, res, next){
    var result = "API_KEY_FAIL";
    if (req.body.key === APIKEY ) {
        cart.deleteItemFromCart(req.body.session_id, req.body.product_id);
        result = "true";
    }
    res.json({result: result});
});

router.post('/buyCart', function(req, res, next){
    var result = "API_KEY_FAIL";
    if (req.body.key === APIKEY ) {
        cart.deleteCart(req.body.session_id);
        result = "true";
    }
    res.json({result: result});
});

router.post('/getProducts', function(req, res, next){
    if (req.body.key === APIKEY ){
        comm.getProducts(function (data) {
            console.log(data)
            res.write(data);
            res.end();
        });
    }
    else {
        res.json({message: "API_KEY_FAILED"});
    }
});

router.post('/registerUser', function(req, res, next){
    var result = "API_KEY_FAIL";
    if (req.body.key === APIKEY ){
        comm.register(req.body.email,req.body.pass,req.body.name,
            req.body.address,req.body.image_route, function(data){
                console.log(data);
                res.write(data);
                res.end();
            });
    }
    else {
        res.json({message: "API_KEY_FAIL"});
    }
});

//Arreglar el no encontrado
router.post('/getProductDetail', function(req, res, next){
    if (req.body.key === APIKEY ){
        comm.getProduct(req.body.product_id, function (data) {
            console.log(data);
            if (data == "") {
                console.log("aca");
                res.json({result: "false"});

            }
            res.write(data);
            res.end();
        });
    }
    else {
        res.json({message: "API_KEY_FAIL"});
    }
});

//hacer
router.post('/searchProduct', function(req, res, next){
    var result = "API_KEY_FAIL";
    if (req.body.key === APIKEY ){
        res.json({message: "hola"});
    }
    res.json({message: "hola"});
});

module.exports = router;