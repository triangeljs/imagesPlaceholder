var express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs');
var MongoClient = require('mongodb').MongoClient,
    mongodbHost = 'mongodb://localhost:27017/images';

var imgSrc = path.join(__dirname, '../', 'public/picCategory/');

router.get('/', function(req, res, next) {
  MongoClient.connect(mongodbHost, function(err, db) {
    db.collection('picType').find().toArray(function(err, result) {
      res.render('index', { picWidth: '', picHeight: '', picAttr: 0, picArr: [], picTypeData: result });
    });
  });
});

router.post('/', function(req, res, next) {
  var userIp = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
  var setPicAttr = {
    'width': Number(req.body.picWidth),
    'height': Number(req.body.picHeight)
  }
  var picAttr = req.body.picAttr;
  
  var folder_exists = fs.existsSync(imgSrc + picAttr);
  if(!folder_exists) {
    res.redirect('/');
    return false;
  }
  var imgArr = fs.readdirSync(imgSrc + picAttr + '/');
  var picList = [];
  
  for(var i=0;i<imgArr.length;i++) {
    picList.push('/'+ setPicAttr['width'] +'/'+ setPicAttr['height'] +'/'+ picAttr +'/?'+ (i+1));
  }
  
  MongoClient.connect(mongodbHost, function(err, db) {
    db.collection('picType').find().toArray(function(err, result) {
      res.render('index', { picWidth: setPicAttr['width'], picHeight: setPicAttr['height'], picAttr: picAttr, picArr: picList.shuffle(), picTypeData: result});
    });
  });
});

if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = function() {
    for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
  };
}

module.exports = router;