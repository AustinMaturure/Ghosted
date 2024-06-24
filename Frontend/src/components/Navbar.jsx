import '../css/Navbar.css'
import deliveryImg from '../assets/delivery.svg'
import closeImg from '../assets/close.svg'
import logo from '../assets/logo/logos.svg'
import search from '../assets/logo/search.svg'
import menu from '../assets/logo/menu.svg'
import cart from '../assets/logo/cart1.svg'
import { useState } from 'react'
export default function Navbar(){

    let [visible, setVisibility] = useState(true)
    
    return(
        <>
        <div className={`delivery-banner flex ${visible ? '' : 'hide'}`}>
                <div className="delivery-img-cnt">
                    <img src={deliveryImg} alt="" />
                </div>
                <p> NATIONWIDE DELIVERY AVAILABLE </p>
               
                <div className="close-img-cnt" onClick={()=> setVisibility(false)}>
                      <img src={closeImg} alt="" />  
                </div>     
        </div>
        <nav className='navbar'>
        <div className="menu-img-cnt">
                      <img src={menu} alt="" />  
                </div>     
            <div className="logo-img-cnt">
                <img src={logo} alt="" /> 
                
            </div>
            <div className='nav-right'>
                <div className="search-img-cnt">
                <img src={search} alt="" />  
            </div>   
            <div>
                
            </div>
             
            <div className="cart-img-cnt" >
               <img src={cart} alt="" />  
            </div> 
                </div>  
             

        </nav>
        
        </>
    )
}