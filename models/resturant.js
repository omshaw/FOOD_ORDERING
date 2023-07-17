const mongoose = require('mongoose')

const resturantSchema = new mongoose.Schema({ name: String, fileImage:{file:String} , location:{address:String,lng:Number,lat:Number}});
const ResturantModel = mongoose.model('resturants', resturantSchema);

module.exports= ResturantModel; 