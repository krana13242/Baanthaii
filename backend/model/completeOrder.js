const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:String,
    user_id: mongoose.Schema.Types.ObjectId,
    totalPrice: Number,
    cartItem: Array,
    date: Date,
    address:String,
    mobile:String,
    payment:String
})

const CompleteOrder = mongoose.model('CompleteOrder', schema)


module.exports =  CompleteOrder
