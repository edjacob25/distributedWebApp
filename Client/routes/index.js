var express = require('express');
var router = express.Router();
var toMiddle = require("../modules/commToMidd");
var querystring = require('querystring');

var API_KEY = "123456hola";
var JSONToView;

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Data: "+req.body.picture);
  console.log("Data: "+req.body.picture);
  var data = querystring.stringify({
    key: API_KEY
  });

  //Obtaining prroducts
  toMiddle.requestServer(data, "getProducts",'POST',function(response){
    responseJSON = JSON.parse(response);
    if(responseJSON["result"] === undefined){
      JSONToView = responseJSON;
      //If logged in -> Render index with menu logged and products
      if(req.session.session_id != "" && req.session.session_id != undefined){
        res.render('index',{showLogged: true, productArray: JSONToView});
      }else {
        res.render('index', {showLogged: false, productArray: JSONToView});
      }
    }
  });

});

router.get('/index', function(req, res, next) {


});

module.exports = router;
