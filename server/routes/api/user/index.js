var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* GET home page. */
router.get('/', function(req, res, next) {
  const us = [
  {
    name: 'kim',
    age: 14,
    job: 'dev'    
  },
  {
    name: 'kim',
    age: 14,
    job: 'musician'
  },
  {
    name: 'kim',
    age: 14,
    job: 'hunter'
  },
  ]
  res.send({users: us})
})



router.post('/', (req, res, next) => {
  res.send({success : true})
})

router.put('/', (req, res, next) => {
  res.send({success : true})
})

router.delete('/', (req, res, next) => {
  res.send({success : true})
})

router.all('*', function(req, res, next) {
  next(createError('no such api exits'));
})




module.exports = router;
