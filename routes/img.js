var express = require('express');
var router = express.Router();
var fs = require('fs');
var images = require('images');
var url = require('url');
var path = require('path');

router.get('/', function(req, res, next) {
  var imgSrc = path.join(__dirname, '../', 'public/pics/');
  var imgArr = fs.readdirSync(imgSrc);
  var imgPointer = req.url.replace(/\/\??/img, "");
  var imgAttr = req.baseUrl.match(/\d+/img);
  var setPicAttr = {
    'width': Number(imgAttr[0]),
    'height': Number(imgAttr[1])
  }
  if(imgPointer > imgArr.length || imgPointer <= 0) {
    imgPointer = 1;
  }
  var getPicAttr = images(imgSrc + imgArr[imgPointer - 1]).size();

  var curPic = images(imgSrc + imgArr[imgPointer - 1]);
  if(getPicAttr['width']/getPicAttr['height'] <= setPicAttr['width']/setPicAttr['height']) {
    var setH = Math.ceil(setPicAttr['width'] * getPicAttr['height'] / getPicAttr['width']);
    var getCurPic = curPic.size(setPicAttr['width']);
    var buffer = images(getCurPic, 0, (setH - setPicAttr['height']) / 2, setPicAttr['width'], setPicAttr['height']).encode("jpg", {operation: 100});
  } else {
    var setW = Math.ceil(getPicAttr['width'] * setPicAttr['height'] / getPicAttr['height']);
    var getCurPic = curPic.size(setW);
    var buffer = images(getCurPic, (setW - setPicAttr['width']) / 2, 0, setPicAttr['width'], setPicAttr['height']).encode("jpg", {operation: 100});
  }

  res.writeHead(200, {"Content-Type": "image/jpeg"});
  res.write(buffer, "binary");
  res.end();
});

module.exports = router;
