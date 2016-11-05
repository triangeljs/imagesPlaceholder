var express = require('express'),
    router = express.Router();
var MongoClient = require('mongodb').MongoClient,
    mongodbHost = 'mongodb://localhost:27017/images';

router.get('/', function(req, res, next) {
  req.session.user = null;
  res.render('login');
});

router.post('/', function(req, res, next) {
  MongoClient.connect(mongodbHost, function(err, db) {
    db.collection('user').find({'name': req.body.name}).toArray(function(err, result) {
      if(result.length != 0 && result[0].name == req.body.name && result[0].password == req.body.pd) {
        req.session.user = result[0].name;
        res.redirect('admin');
      } else {
        res.render('login');
      }
    });
  });
});

module.exports = router;