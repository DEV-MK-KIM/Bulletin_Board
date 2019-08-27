var express = require('express');
var router = express.Router();
var createError = require('http-errors');


router.use('/user', require('./user'))
/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.send({msg : 'hello'})
})

router.get('/hi', function(req, res, next) {
  res.send({msg : 'hi'})
})

router.all('*', function(req, res, next) {
  next(createError('no such api exits'));
})






module.exports = router;
