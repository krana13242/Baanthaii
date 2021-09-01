import { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

import './Home.css'

const Home = () =>{
    const [order, setOrder] = useState([])
    const [cancelOrder, setCancelOrder] = useState([])
    const [completeOrder, setCompleteOrder] = useState([])
    const [user, setUser] = useState([])
    const [decoration, setDecoration] = useState([])
    const [photography, setPhotograhy] = useState([])
    const [quotation, setQuotation] = useState([])
    const [render, setRender] = useState(true)


    let history = useHistory();

    useEffect(()=>{
        const getData = async() =>{
            try{
                const user = await axios.get('https://baanthai.herokuapp.com/api/admin/get/users')  
               
                const order = await axios.get('https://baanthai.herokuapp.com/api/admin/get/orders')  
                const comOrder = await axios.get('https://baanthai.herokuapp.com/api/admin/get/completeorder')  
                const canOrder = await axios.get('https://baanthai.herokuapp.com/api/admin/get/cancelorder')  
               
                const decoration = await axios.get('https://baanthai.herokuapp.com/api/admin/get/decorationbook') 

                const photography = await axios.get('https://baanthai.herokuapp.com/api/admin/get/photographybook') 

                const quotation = await axios.get('https://baanthai.herokuapp.com/api/admin/get/quotation') 

                setUser(user.data)
                setOrder(order.data)
               
                setCancelOrder(canOrder.data)
                setCompleteOrder(comOrder.data)

                setDecoration(decoration.data)
                setPhotograhy(photography.data)
                setQuotation(quotation.data)
            
            }catch(ex){
                console.log(ex)
                return 
            }
        } 
        console.log('user',user)
        console.log('order',order)
        console.log('cancel',cancelOrder)
        console.log('complete',completeOrder)

        getData()
        Render()
    },[render])

    const Render = ()=>{
      setTimeout(()=>{
        setRender(!render)
      },3000)
    }

    const cancelOrderPage = ()=>{
        history.push("/order-cancel");
    }
    const completeOrderPage = ()=>{
        history.push("/order-complete");
    }
    const requestOrderPage = ()=>{
        history.push("/order-request");
    }

    const requestDecorationPage = ()=>{
        history.push("/decoration-request");
    }

    const requestPhotograhyPage = ()=>{
        history.push("/photography-request");
    }

    const requestQuotation = ()=>{
        history.push("/quotation");
    }


    return(
        <section className="pb-5">
            <br />
            <h1 className="text-center mt-3">Admin DashBroad</h1>
            
            <div className="container">
                <hr />
                <h4 className="text-center color-main">Order requests</h4>
                <div className="row g-2">
                    <div className="col-lg-4" onClick={()=>requestOrderPage()}>
                        <div className="card card-order border border-1 text-center flex-flow mt-5">
                            <h5 className="mb-5">Food Order Requets</h5>
                            <p>Total : {order.length} order Requets</p>
                        </div>
                    </div>
                    <div className="col-lg-4" onClick={()=>completeOrderPage()}>
                        <div className="card card-order border border-1 text-center flex-flow mt-5">
                            <h5 className="mb-5">Completed Orders</h5>
                            <p> {completeOrder.length} orders are Completed</p>
                        </div>
                    </div>
                    <div className="col-lg-4" onClick={()=>cancelOrderPage()}>
                        <div className="card card-order border border-1 text-center flex-flow mt-5">
                            <h5 className="mb-5">Canceled Orders</h5>
                            <p>{cancelOrder.length} orders are canceled</p>
                        </div>
                    </div>
                </div>

                <hr />
                {/* Decoration Booking */}
                <h4 className="text-center color-main mt-5">Decoration Bookings</h4>
                <div className="row g-2">
                    <div className="col-lg-4" onClick={()=>requestDecorationPage()}>
                        <div className="card card-decoration border border-1 text-center flex-flow mt-5">
                            <h5 className="mb-5">Booking Decoration</h5>
                            <p>Total : {decoration.length} Booking Requets has made</p>
                        </div>
                    </div>

                </div>
                <br />

                <hr />
                {/* Photographt Booking */}
                <h4 className="text-center color-main mt-5">Photography Bookings</h4>
                <div className="row g-2">
                    <div className="col-lg-4" onClick={()=>requestPhotograhyPage()}>
                        <div className="card card-decoration border border-1 text-center flex-flow mt-5">
                            <h5 className="mb-5">Booking Photography</h5>
                            <p>Total : {photography.length} Booking Requets has made</p>
                        </div>
                    </div>

                </div>


                <hr />
                {/* Quotion Booking */}
                <h4 className="text-center color-main mt-5">Quotion Request</h4>
                <div className="row g-2">
                    <div className="col-lg-4" onClick={()=>requestQuotation()}>
                        <div className="card card-decoration border border-1 text-center flex-flow mt-5">
                            <h5 className="mb-5">Quotion Request</h5>
                            <p>Total : {quotation.length} Quotion Requets has made</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Home 

