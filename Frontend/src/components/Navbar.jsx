import '../css/Navbar.css';
import deliveryImg from '../assets/delivery.svg';
import closeImg from '../assets/close.svg';
import logo from '../assets/logo/logos.svg';
import search from '../assets/logo/search.svg';
import menu from '../assets/logo/menu.svg';
import cart from '../assets/logo/cart1.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [visible, setVisibility] = useState(true);
  const [svisible, setsVisibility] = useState(true);

  return (
    <>
      {/* Delivery banner */}
      <div className={`delivery-banner flex ${visible ? '' : 'hide'}`}>
        <div className="delivery-img-cnt">
          <img src={deliveryImg} alt="Delivery" />
        </div>
        <p>NATIONWIDE DELIVERY AVAILABLE</p>
        <div className="close-img-cnt" onClick={() => setVisibility(false)}>
          <img src={closeImg} alt="Close" />
        </div>
      </div>
      
      {/* Navbar */}
      <nav className='navbar'>
        <div className="menu-img-cnt">
          <img src={menu} alt="Menu" />
        </div>
        <Link to={'/'}>
          <div className="logo-img-cnt">
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <div className='nav-right'>
          <div className="search-img-cnt" onClick={() => setsVisibility(!svisible)}>
            <img src={search} alt="Search" />
          </div>
          <div className="cart-img-cnt">
            <Link to={'/cart'}>
              <img src={cart} alt="Cart" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Search box */}
      <div className={`search-box ${svisible ? '' : 'search-hide'}`}>
        <input className='search-ipt' type="text" placeholder='Enter Search Query' />
        <button className='search-btn' type="submit">
          <div className="search-img-cnt">
            <img src={search} alt="Search" />
          </div>
        </button>
      </div>
    </>
  );
}
