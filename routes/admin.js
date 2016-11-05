var express = require('express'),
    router = express.Router(),
    fs = require('fs');
var MongoClient = require('mongodb').MongoClient,
    mongodbHost = 'mongodb://localhost:27017/images';

router.get('/', function(req, res, next) {
  if(!req.session.user){
    res.redirect('login');
    return false;
  }
  MongoClient.connect(mongodbHost, function(err, db) {
    db.collection('picType').find().toArray(function(err, result) {
      res.render('admin', {picTypeData: result});
    });
  });
});

router.post('/', function(req, res, next) {
  if(!req.session.user){
    res.redirect('login');
    return false;
  }
  if(req.body.dataType == 'true') {
    //console.log('添加新数据');
    MongoClient.connect(mongodbHost, function(err, db) {
      db.collection('picType').save({'directory':req.body.directory, 'title':req.body.title});
      db.collection('picType').find().toArray(function(err, result) {
        res.render('admin', {picTypeData: result});
      });
    });
  } else if(req.body.dataType == 'false') {
    //console.log('修改数据');
    MongoClient.connect(mongodbHost, function(err, db) {
      db.collection('picType').update({"directory": req.body.directory},{$set: {"title": req.body.title}},function(err, result){
        res.redirect('admin');
      });
    });
  } else {
    //console.log('删除数据');
    MongoClient.connect(mongodbHost, function(err, db) {
      var rootFile = './public/picCategory/' + req.body.directory;
      db.collection('picType').remove({'directory': req.body.directory},function(err, result){
        deleteFolder(rootFile);
        res.redirect('admin');
      });
    });
  }
});

// 文件夹和文件的删除
function deleteFolder(path) {
  var files = [];
  if( fs.existsSync(path) ) {
    files = fs.readdirSync(path);
    files.forEach(function(file,index) {
      var curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

module.exports = router;