const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ name: String, password: String, email: String, phone: String, role:{type:Number,default:0}, address:[{location:String,lng:Number,lat:Number}]});
const Model = mongoose.model('registers', userSchema);

module.exports= Model; 