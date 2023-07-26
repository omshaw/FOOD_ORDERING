const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({ phone:String,total: Number,Address:String, product:[{name:String,Qty:Number,price:Number}]});
const OrderModel = mongoose.model('orders', orderSchema);

module.exports= OrderModel; 