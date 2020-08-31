const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
   name: {type: String, required: true},
   email: {type: String, required: true, unique: true},
   password: {type: String, required: true},
   avatarUrl: String,
   resetToken: String,
   resetTokenExp: Date,
})

module.exports = model('User', schema)