var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/fallinlovewith/:thing', function(req, res, next) {
  res.render('love', { thingVar: req.params.thing });
});

module.exports = router;
