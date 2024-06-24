import '../css/Navbar.css'
import deliveryImg from '../assets/delivery.svg'
import closeImg from '../assets/close.svg'
export default function Navbar(){
    return(
        <>
        <div className="delivery-banner flex">
      
                <p> FREE NATIONWIDE DELIVERY AVAILABLE </p>
                <div className="delivery-img-cnt">
                    <img src={deliveryImg} alt="" srcset="" />
                </div>
                <div className="delivery-img-cnt">
                    <img src={closeImg} alt="" />
                </div>
                
          
               
        </div>
        
        </>
    )
}