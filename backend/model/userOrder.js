const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:String,
    user_id: mongoose.Schema.Types.ObjectId,
    totalPrice: Number,
    cartItem: Array,
    date: Date,
    payment:String,

    address:String,
    mobile:String,
   
})

const MyOrder = mongoose.model('MyOrder', schema)


module.exports =  MyOrder