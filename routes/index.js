var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var images = require('images');
//原始图片路径
var imgSrc = path.join(__dirname, '../', 'public/pics/');//(/app/nodejs/imagesPlaceholder/public/pics/)
//零时保存的图片路径
var updataImgSrc = path.join(__dirname, '../', 'public/updata/')//(/app/nodejs/imagesPlaceholder/public/updata/)

router.get('/', function(req, res, next) {
  res.render('index', { picWidth: '', picHeight: '', picAttr: 0, picArr: [] });
});

router.post('/', function(req, res, next) {
  if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
      for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
      return this;
    };
  }
  var userIp = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
  var setPicAttr = {
    'width': Number(req.body.picWidth),
    'height': Number(req.body.picHeight)
  }
  var picAttr = req.body.picAttr;
  var imgArr = fs.readdirSync(imgSrc);
  imgArr = imgArr.shuffle();
  var curPic;
  var picjh = [];
  if (fs.existsSync(updataImgSrc + userIp)) {
    //console.log('已经创建过此更新目录了');
  } else {
    fs.mkdirSync(updataImgSrc + userIp);
    //console.log('更新目录已创建成功');
  }
  for(var i=0;i<imgArr.length;i++) {
    var getPicAttr = images(imgSrc + imgArr[i]).size();
    curPic = images(imgSrc + imgArr[i]);

    if(getPicAttr['width']/getPicAttr['height'] <= setPicAttr['width']/setPicAttr['height']) {
      var setH = Math.ceil(setPicAttr['width'] * getPicAttr['height'] / getPicAttr['width']);
      var getCurPic = curPic.size(setPicAttr['width']);
      images(getCurPic, 0, (setH - setPicAttr['height']) / 2, setPicAttr['width'], setPicAttr['height']).save(updataImgSrc + userIp +'/p' + i + '.jpg', {
        quality: 80
      })
    } else {
      var setW = Math.ceil(getPicAttr['width'] * setPicAttr['height'] / getPicAttr['height']);
      var getCurPic = curPic.size(setW);
      images(getCurPic, (setW - setPicAttr['width']) / 2, 0, setPicAttr['width'], setPicAttr['height']).save(updataImgSrc + userIp +'/p' + i + '.jpg', {
        quality: 80
      })
    }
    picjh.push('/updata/'+ userIp +'/p' + i + '.jpg');
  }
  
  res.render('index', { picWidth: setPicAttr['width'], picHeight: setPicAttr['height'], picAttr: picAttr, picArr: picjh});
});

module.exports = router;