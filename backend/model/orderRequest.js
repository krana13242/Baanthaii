const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:String,
    user_id: String,
    totalPrice: Number,
    cartItem: Array,
    date: Date,
    address:String,
    mobile:String,
    payment:String
})

const Order = mongoose.model('Order', schema)


module.exports =  Order