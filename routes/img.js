var express = require('express');
var router = express.Router();
var fs = require('fs'),
    gm = require('gm').subClass({imageMagick: true});
var url = require('url');

router.get('/', function(req, res, next) {
  var imgPointer = req.url.replace(/\/\??/img, "");
  var imgAttr = req.baseUrl.match(/\d+/img);
  var setWidth = imgAttr[0];
  var setHeight = imgAttr[1];
  var imgSrc = '/app/nodejs/imagesPlaceholder/public/pics/';
  var imgArr = fs.readdirSync('/app/nodejs/imagesPlaceholder/public/pics/');
  if(imgPointer > imgArr.length || imgPointer <= 0) {
    imgPointer = 1;
  }
  gm(imgSrc + imgArr[imgPointer - 1])
  .resize(setWidth, setHeight, "!")
  .toBuffer('jpg', function(err, buffer) {
    res.writeHead(200, {"Content-Type": "image/jpeg"});
    res.write(buffer, "binary");
    res.end();
  })
});

module.exports = router;
