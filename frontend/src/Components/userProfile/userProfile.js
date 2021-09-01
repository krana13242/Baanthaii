import {useState, useEffect} from 'react'
import axios from 'axios'
import {Route, Link } from 'react-router-dom';
import './userProfile.css'

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token")

const UserProfile = ()=>{
    const [state, setState] = useState({})
    const [myOrder, setMyOrder] = useState([])
    
    useEffect(()=>{
        const getUser = async() =>{
            try{
                // const user = await axios.get('http://localhost:5000/api/user/me')
                // const myorder = await axios.get('http://localhost:5000/api/post/myorder') 

                const user = await axios.get('https://baanthai.herokuapp.com/api/user/me') 
                const myorder = await axios.get('https://baanthai.herokuapp.com/api/post/myorder') 
                setState(user.data)
                setMyOrder(myorder.data)
            }catch(ex){
                console.log(ex)
                return 
            }
        }
        console.log('my order', myOrder)
        console.log('my profile', state)
        getUser()
        
    },[])

    return(
        <div className="">
            <br />
            <div className="header-title-b">
                Baanthai User Profile
            </div>
            <div className="cover-box">
                <div className='name-header'>
                    {state.name}
                </div>
            </div>
            <hr />
            <div className="body container">
                <div className="my-order">
                    <div className="mb-3 heading">
                        My Orders
                    </div>
                    <div className="">
                        {
                            myOrder.map((order,i)=>{
                                return(
                                    <div key={i} className="order-body mb-3">
                                        <p>order no: {i+1}</p>
                                        <p>Name: {order.name}</p>
                                        <p>Total Price: {order.totalPrice}</p>
                                        <p>Payment type:{order.payment}</p>
                                        
                                        <div className="mp-1">
                                            {
                                                order.cartItem.map((item,i)=>{
                                                    return(
                                                        <div key={i} className="row align-items-center">
                                                            <hr />
                                                            <div className="col-lg-6">{item.title}</div>
                                                            <div className="col-lg-6"> Qnt: {item.quantity}</div>
                            
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                       
                                    </div>
                                )
                            })
                        }            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile






// const user = await axios.get('https://baanthai.herokuapp.com/api/user/me')
// const myorder = await axios.get('https://baanthai.herokuapp.com/api/post/myorder') 


// const user = await axios.get('http://localhost:5000/api/user/me')
// const myorder = await axios.get('http://localhost:5000/api/post/myorder') 