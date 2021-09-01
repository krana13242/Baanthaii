import React, { useState ,useEffect, useContext} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { Link } from 'react-router-dom'
import './order.css'



const CanceledOrder = ()=>{
    const [order, setOrder] = useState([])
    const [render, setRender] = useState(true)
    let history = useHistory();

    useEffect(()=>{
        const getData = async() =>{
            try{
                const order = await axios.get('https://baanthai.herokuapp.com/api/admin/get/cancelorder')  
                setOrder(order.data)
            }catch(ex){
                console.log(ex)
                return 
            }
        } 
        console.log('order',order)
        getData()
        Render()
    },[render])

    const Render = ()=>{
        setTimeout(()=>{
        setRender(!render)
      },3000)
    }

    const backHome = ()=>{
        history.push('/')
    }

    const orderCard = (item)=>{
        return(
            <div className="orderCard cancel-card border border-1 mb-3">
                <div className="">
                    <div className="d-flex">
                        <h6>Order Id: {item._id} </h6>
                        <i class="fas fa-trash ms-auto" onClick={()=>Remove(item._id)}></i>
                    </div>
                    
                    <hr />
                </div>
                <div className ="items">
                    <p>Items</p>
                    {
                         item.cartItem.map((i)=>(
                             <p>{i.title}</p>
                         ))
                    }
                </div>
                <hr/>
                <div>
                    <p>Name: {item.name}</p>
                    <p>Address: {item.address}</p>
                    <p>Mobile: {item.mobile}</p>
                    <p>Total Price: {item.totalPrice}</p>
                    <p>Payment Type: "Cash"</p>
                </div>
                <hr />
                <div>
                    {/* <Link className="btn me-3" onClick={()=>complete(item._id)}>Complete Order</Link>
                    <Link className="btn">Cancel</Link> */}
                </div>
            </div>
        )
    }

    const Remove = async(id) =>{
        console.log(id)
        await axios.post(`https://baanthai.herokuapp.com/api/admin/post/cancel-delete/${id}`)
    }

    return(
        <div className="container">
            <br />
            <div className="btn " onClick={()=>backHome()}>Back Home</div>
            <h2 className="text-center">Canceled Order</h2>
            <hr/>
            <br />
            {
                order.length ===0 ? <h3>We have empty canceled orders</h3> : <h5>Total {order.length} cancel order</h5>
            }
            <br />

            {
                order.length>=0 &&(
                    <div>
                        {order.map(item=>(
                            <div>
                                {orderCard(item)}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default CanceledOrder


// const comOrder = await axios.get('https://baanthai.herokuapp.com/api/admin/get/completeorder')  
// const canOrder = await axios.get('https://baanthai.herokuapp.com/api/admin/get/cancelorder')  