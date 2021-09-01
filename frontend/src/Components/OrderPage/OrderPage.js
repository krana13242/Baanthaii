import {useState,useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";

import jwtDecode from 'jwt-decode'
import AddCartState from '../../ContextApi/addCart';
import { createOrder } from '../../api-request/apiRequest';
import './OrderPage.css'

const OrderPage = ()=>{
    const [user , setUser] = useState(null)
    const [btnActive, setBtnActive] = useState(false)
    const [cashMethod, setCashMethod] = useState(false)
    const [bkashMethod, setBkashMethod] = useState(false)
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [Ammount, setAmmount] = useState(null)
    const [pin, setPin] = useState('')
    const [payment, setPayment] = useState('')
    const [completeOrder, setCompleteOrder] = useState(false)
    const [bkashBtn, setBkashBtn ] = useState(false)

    let history = useHistory();

    const value = useContext(AddCartState);
    const {cart, totalPrice, clearCart} = value

    const [orderObject, setOrderObject]= useState({
        username:'',
        user_id: '',
        totalPrice: null,
        cartItem: [],
        date:null,
        address:null,
        mobile: null,
        payment: null
    })

    useEffect(()=>{
        try{
            const token = localStorage.getItem('token')
            const user = jwtDecode(token)
            if(user){
                setUser(user)
              }
            
            setOrderObject({
                name:user.name,
                user_id: user._id,
                totalPrice: calculateTotal(),
                cartItem: cart,
                date:new Date(),
                address:address,
                mobile:mobile,
                payment: payment
            })
        }
        catch(ex){
            return 
        }
        BkashBtn()
        console.log('oderObject', orderObject)
    },[cashMethod, bkashMethod, address,mobile, completeOrder,pin ,Ammount])

    const calculateTotal = ()=>{
        return totalPrice()+((totalPrice()*5)/100)
    }

    const paymentMethod = (option)=>{
        if(option==="cash"){
            setPayment("cash")
            setCashMethod(true)
            
        }else{
            setCashMethod(false)
        }
        if(option==="bkash"){
            setPayment("bkash")
            setBkashMethod(true)
        }else{
            setBkashMethod(false)
        }
    }

    const sendOrder = async (oderObject)=>{
        await createOrder(orderObject)
        clearCart()
        setCompleteOrder(true)
        
    }

    const backHome = ()=>{
        history.push("/");
    }

    const BkashBtn = () =>{
        if(Ammount !==null && pin.length >=4 ){
            setBkashBtn(true)
        }
    }
    
    return(
        <div className="container">
            <br />
            <h1 className="text-center">Order Confirmation</h1>
            <br />
            <div>
            {cart.length >=1&&(
                <div className="mb-3 topbar">
                     <div className="menu-bar-c d-flex">
                        <div className="menu-b">
                            Item Name
                        </div>
                        <div className="price-b flex-flow">
                            Price
                        </div>
                        <div className="quantity-b flex-flow">
                            Quantity
                        </div>
                        <div className="sub-price-b flex-flow">
                            Sub Total
                        </div>
                </div>

                {value.cart.map((item,index)=>(
                    <div className="item-body d-flex" key={index}>
                        <div className="menu ">
                            {item.title}
                        </div>
                        <div className="price flex-flow">
                            {item.price}
                        </div>
                        <div className="quantity flex-flow">
                                {item.quantity}
                        </div>
                        <div className="sub-price flex-flow"> 
                            {item.quantity*item.price}
                        </div>

                    </div>
                ))}

                <div className="totalPrice">
                    <p>Total {totalPrice()}</p>
                    <p>Tax 5%: {totalPrice()*5/100} tk</p>
                    <p>Delivery Charge: 50tk</p>
                    <hr />
                    <p>Total Price : <span>{calculateTotal()}</span></p>
                </div>
            </div>
            )}
            </div>
            
            {/* Display when user logged in */}
            <div>
                {
                    user===null &&(
                        <div className="login-text">
                            Please Login To order 
                        </div>
                    )
                }
            </div>

            {/* Display Login Button If user logged in */}
            {
                user &&(
                    <div>
                        <h5>Please Select Your Payment Method</h5>
                        <div>
                            <button className="btn me-3" onClick={()=>paymentMethod("cash")}>Cash</button> <button className="btn"onClick={()=>paymentMethod("bkash") }>Bkash</button>
                        </div>
                        <hr />
                        {/* Cash Method */}
                        {
                            cashMethod &&(
                                <div>
                                    <br />
                                    <h5>Cash on delivery</h5>
                                    <p>Set Your Delivery Location</p>
                                    <div>
                                        <textarea                                   
                                            value={address}
                                            onChange={e=>setAddress(e.target.value)}>
                                        </textarea>
                                    </div>
                                    <div>
                                        <p>Set Your Contact</p>
                                        <input value={mobile} onChange={(e)=>setMobile(e.target.value)}n/>
                                    </div>
                                    
                                    <div className="btn btn-order mt-3" onClick={()=>sendOrder(orderObject)}>order</div>
                                </div>
                            )
                        }
                        
                        {/* Bkash Method */}
                        {
                            bkashMethod &&(
                                <div>
                                    <br />
                                    <h5 className="mb-2">Bkash Payment</h5>
                                    <br />
                                    <div>
                                        <textarea                                   
                                            value={address}
                                            onChange={e=>setAddress(e.target.value)}>
                                        </textarea>
                                    </div>
                                    <p>Set Your Delivery Location</p>
                                    <div>
                                        <input value={mobile} onChange={(e)=>setMobile(e.target.value)}n/>
                                        <p>Set Your Bkash Number</p>
                                    </div>

                                    <div className="d-flex">
                                        <div>
                                            <input value={Ammount} onChange={(e)=>setAmmount(e.target.value)}/>
                                            <p>Enter ammount</p>
                                        </div>
                                        <div>
                                            <input value={pin} onChange={(e)=>setPin(e.target.value)}/>
                                            <p>Enter Bkash Pin</p>
                                        </div>
                                    </div>

                                    {
                                        bkashBtn &&(
                                            <div className="btn btn-order" onClick={()=>sendOrder(orderObject)}>order</div>
                                        )
                                    }
                                    

                                </div>
                            )
                        }

                        {/* Succesfull  */}
                        {
                            completeOrder &&(
                                <div className="order-msg">
                                     <br />
                                     <h6>Your Order Has been placed Succesfully</h6>
                                     <button className='btn' onClick={()=>backHome()}>Go Home</button>
                                </div>
                            )
                        }
                    </div>
                        
                    
                )
            }
            
        </div>
    )
}

export default OrderPage