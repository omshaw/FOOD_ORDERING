const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({ phone: String, cart:[{id:String,Qty:Number}]});
const CartModel = mongoose.model('carts', cartSchema);

module.exports= CartModel; 