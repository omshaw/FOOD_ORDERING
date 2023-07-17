require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const Model = require('./models/users.js')
const ProductModel = require('./models/product.js')
const ResturantModel=require('./models/resturant.js')
const CartModel=require('./models/cart.js')
const app = express()
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors())
app.use(cookieparser())
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.69og5.mongodb.net:27017,cluster0-shard-00-01.69og5.mongodb.net:27017,cluster0-shard-00-02.69og5.mongodb.net:27017/e-comm?ssl=true&replicaSet=atlas-gib6kp-shard-0&authSource=admin&retryWrites=true&w=majority`).then(async() => {

  console.log('connected ...');
})

app.post('/register', async (req, res) => {
  const name = req.body.name;
  const pass = req.body.password;
  const phone = req.body.phone;
  const email = req.body.email;
  let v = await Model.find({ phone: `${phone}` });
  if (v.length)
    res.send({ 'body': 'Phone number already registered !' });
  else {
    Model.create({ name: `${name}`, password: `${pass}`, phone: `${phone}`, email: `${email}` }, (err, reslut) => {
      if (err) {
        res.send({ 'body': 'Something went wrong' });
      }
      else {
        res.send({ 'body': 'Register Successfully!' });
      }
    })
  }
})

app.post('/login', async (req, res) => {
  const phone = req.body.phone;
  const pass = req.body.password;
  let v = await Model.find({ phone: `${phone}` });
  if (v.length == 0 || v[0].password != pass)
    res.send({ 'msg': '0', 'body': '' });
  else {
    res.send({ 'msg': '1', 'body': JSON.stringify(v[0]) });
  }
})
app.post('/find-product', async (req, res) => {
  const ele = req.body;
  let v = await ProductModel.find(ele);
  if (v.length) {
    res.send(v);
  }
  else {
    res.send({ msg: 'Not Found!' });
  }
})
app.post('/admin/update-product', async (req, res) => {
  const ele = req.body;
  const fnd =req.find;
  let v = await ProductModel.findOneAndUpdate(fnd,ele);
  if (v) {
    res.send({msg:'data updated successfully !'});
  }
  else {
    res.send({ msg: 'Not updated !' });
  }
})

app.post('/admin/delete-product', async (req, res) => {
  const ele = req.body;
  const fnd =req.find;
  let v = await ProductModel.findOneAndDelete(fnd,ele);
  if (v) {
    res.send({msg:'data deleted successfully !'});
  }
  else {
    res.send({ msg: 'Not updated !' });
  }
})

app.post('/admin/add-product', async (req, res) => {
  const ele = req.body;
  // let v = await ProductModel.find({ name: ele.name, dishName: ele.dishName });
  // if (v.length) {
  //   res.send({ 'msg': 'Item already exists in the resturant' });
  // }
  // else {
    ProductModel.create(ele, (err, result) => {
      if (err) {
        res.send({ 'msg': 'Something went wrong !' });
      }
      else {
        res.send({ 'msg': 'Item Added successfully !' })
      }
    });
  // }
})
app.post('/admin/find-resturant',async(req,res)=>{
  let v=await ResturantModel.find(req.body);
  if(v.length)
    res.send(v);
  else
  {
    res.send({'msg':'Not Found !'});
  }
})
app.post('/admin/add-resturant',async(req,res)=>{
  console.log(req.body);
  ResturantModel.create(req.body,(err,result)=>{
    if(err)
    {
      res.send({'msg':'Something went wrong !'});
    }
    else
    {
      res.send({'msg':'Resturant register Successfully !'});
    }
  })
})
app.post('/resturants',async(req,res)=>{
  ResturantModel.find(req.body,(err,data)=>{
    res.json(data);
  })
})

app.post('/r_id',async(req,res)=>{
 let data=await ResturantModel.find(req.body);
 res.send(data[0].i_id);
})


app.post('/add-cart', async (req, res) => {
  const ele = req.body;
    CartModel.findOneAndUpdate({phone:ele.phone},ele,{upsert:true},function(err,result){
      if (err) {
        res.send({ 'msg': 'Something went wrong !' });
      }
      else {
        res.send({ 'msg': 'Item Added in Cart successfully !' })
      }
    })
})

app.post('/cart',async(req,res)=>{
  let data =await CartModel.find(req.body);
  if(data.length)
    res.send(data[0].cart);
  else
    res.send({'msg':'Cart is Empty!'});
})

app.post('/address',async(req,res)=>{
  const ele=req.body;
  console.log(ele);
  Model.updateOne({phone:ele.phone},{$set:{address:ele.address}},function(err,data){
    if(err)
    {
      res.send({ 'msg': 'Something went wrong !' });
    }
    else
    {
      res.send({ 'msg': 'Address is updated successfully !' });
    }
  })
})
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('Server is running...')
})