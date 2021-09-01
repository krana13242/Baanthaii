import {useState,useEffect} from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
let navClassName = "nav align-items-center"

const Header = () =>{
    const[navClass, setNavClass] =useState(navClassName)
    const [state, setState] = useState({})

    useEffect(()=>{
       
    },[])


    const navShow = ()=>{
       if(navClass ===navClassName){
           setNavClass("nav align-items-center active")
       }
       else{
           setNavClass("nav align-items-center")
       }
    }
     
    return(
        <header>
            <div className="header d-flex align-items-center">
                <div className="logo">
                    <Link to='/'><span>Baan</span>thai Admin</Link>
                </div>
                <nav id="nav-list" className={navClass}>
                    <ul className="d-flex align-items-center">
                        <li><Link to="/">DashBroad</Link></li>
                        <li><Link to="/order-request">Order Request</Link></li>
                        <li><Link to="/order-complete">Completed Order</Link></li>
                        <li><Link to="/order-cancel">Canceled Order</Link></li>
                        <li><Link to="/users">Users</Link></li>
                        <li><Link to="/photography-request">Photography</Link></li>
                        <li><Link to="/decoration-request">Decoration</Link></li>x
                        <li><Link to="/quotation">Quotation</Link></li>x
                    </ul>
                </nav>
                <div className="menu-bar desktop" onClick={()=>navShow()}>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </header>   
    )
}

export default Header
