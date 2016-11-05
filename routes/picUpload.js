var express = require('express'),
    router = express.Router(),
    multiparty = require('multiparty'),
    util = require('util'),
    path = require('path'),
    moment = require('moment'),
    fs = require('fs');
var MongoClient = require('mongodb').MongoClient,
    mongodbHost = 'mongodb://localhost:27017/images';

router.get('/', function(req, res, next) {
  if(!req.session.user) {
    res.redirect('login');
    return false;
  }
  MongoClient.connect(mongodbHost, function(err, db) {
    db.collection('picType').find().toArray(function(err, result) {
      res.render('picUpload', {picTypeData: result});
    });
  });
});

router.post('/', function(req, res, next) {
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({uploadDir: './public/temp/'});
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files,null,2);
    if(err) {
      console.log('parse error: ' + err);
    } else {
      var saveDirectory = fields.uid[0];
      var inputFile = files.file[0];
      var uploadedPath = inputFile.path;
      var dstPath = './public/temp/' + inputFile.originalFilename;
      var time = moment(new Date()).format('YYYYMMDDHHMMSS');
      var suffix = path.extname(dstPath);
      var setPath = './public/picCategory/' + saveDirectory + '/' + time + suffix;

      var saveDirPath = './public/picCategory/' + saveDirectory;
      if(!fs.existsSync(saveDirPath)) {
        fs.mkdirSync(saveDirPath);
      }
      fs.renameSync(uploadedPath, setPath);
    }
    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
    res.write('received upload:\n\n');
    //res.end(util.inspect({fields: fields, files: filesTmp}));
    res.end();
  });
});

module.exports = router;