const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
      name: {type: String, default: '', required: true},
      age: {type: Number, default: 1, required: true},
    
    })

const User = mongoose.model('User', userSchema)

module.exports = User;