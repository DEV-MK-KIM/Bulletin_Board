var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const User = require('../../../models/users')

// GET
router.get('/', function(req, res, next) {
  User.find()
  .then(result=> {
    console.log(result)
    res.send({success: true, users: result})})
  .catch(error=>{
    console.log(error);
    res.send({success: false})
  })
})


// POST

router.post('/', (req, res, next) => {
  const {name, age} = req.body;
  const u = new User ({
    name, age
  })
  u.save()
  .then(r=> {
    console.log(r)
    res.send({success: true, user: r})})
  .catch(e=>{
    console.log(e);
    res.send({success: false, msg:e.message})
  })
})

// PUT
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const {name, age} = req.body;
  User.updateOne({_id: id}, {$set: {name ,age}})
  .then(r=>{
    res.send({success: true, user: r })
  })
  .catch(e=>{
    res.send({success: false, msg:e.message})
})
})
// DELETE

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  User.deleteOne({_id: id})
  .then(r=>{
    res.send({success: true, user: r })
  })
  .catch(e=>{
    res.send({success: false, msg:e.message})
})
})


router.all('*', function(req, res, next) {
  next(createError('no such api exits'));
})


module.exports = router;
