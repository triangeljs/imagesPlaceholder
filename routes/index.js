var express = require('express'),
  router = express.Router(),
  path = require('path'),
  fs = require('fs');

var imgSrc = path.join(__dirname, '../', 'public/picCategory/'),
  picCategory = {
    '1': 'city',//城市发展
    '2': 'travel',//名胜古迹
    '3': 'figure',//人物专访
    '4': 'scio'//国新办特写
  }

router.get('/', function(req, res, next) {
  res.render('index', { picWidth: '', picHeight: '', picAttr: 0, picArr: [] });
});

router.post('/', function(req, res, next) {
  var userIp = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
  var setPicAttr = {
    'width': Number(req.body.picWidth),
    'height': Number(req.body.picHeight)
  }
  var picAttr = req.body.picAttr;
  
  var imgArr = fs.readdirSync(imgSrc + picCategory[req.body.picAttr] + '/');
  var picList = [];
  
  for(var i=0;i<imgArr.length;i++) {
    picList.push('/'+ setPicAttr['width'] +'/'+ setPicAttr['height'] +'/'+ picCategory[picAttr] +'/?'+ (i+1));
  }
  
  res.render('index', { picWidth: setPicAttr['width'], picHeight: setPicAttr['height'], picAttr: picAttr, picArr: picList.shuffle()});
});

if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = function() {
    for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
  };
}

module.exports = router;