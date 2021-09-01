const express = require('express')

const Order = require('../model/order')
const UserOrder = require('../model/userOrder')
const DecorationBook = require('../model/decorationBook')
const PhotographyBook = require('../model/photographyBook')

const auth = require('../middleware/auth')
const router = express.Router()

// Order Food
router.post('/order',auth, async(req,res)=>{   

    let order = new Order({
        name:req.body.name,
        user_id: req.user._id,
        totalPrice: req.body.totalPrice,
        cartItem: req.body.cartItem,
        date: req.body.date,
        address:req.body.address,
        mobile:req.body.mobile,
        payment:req.body.payment
    })

    let newUserOrder = new UserOrder({
        user_id:req.user._id,
        name:req.body.name,
        totalPrice: req.body.totalPrice,
        cartItem: req.body.cartItem,
        date: req.body.date,
        payment:req.body.payment
    })

    await order.save()
    await newUserOrder.save()
    res.send(order)
})

// Get All Order For Admin
router.get('/order', async(req,res)=>{
    const order = await Order.find()
    res.status(200).send(order)
})

//GeT my order
router.get('/myorder',auth,async (req,res)=>{
    const orders = await UserOrder.find().sort({date:-1})
    const myorders = orders.filter(user=>user.user_id.toString()===req.user._id)
    
    res.status(200).send(myorders)
})


// Decoration Booking 
router.post('/bookDecoration',async (req,res)=>{
    const bookingObj = req.body
    let booking = new DecorationBook(bookingObj)
    await booking.save()
    res.status(200).send(booking)
})

router.get('/bookDecoration', async(req,res)=>{
    const order = await DecorationBook.find()
    res.status(200).send(order)
})

// Book PhotoGrapahy
router.post('/bookPhotography',async (req,res)=>{
    const bookingObj = req.body
    let booking = new PhotographyBook(bookingObj)
    await booking.save()
    res.status(200).send(booking)
})

module.exports = router