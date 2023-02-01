const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({ name: String, dishName: String, description: String, price: Number,fileImage:{
    file:String}
});
const ProductModel = mongoose.model('products', productSchema);

module.exports= ProductModel; 