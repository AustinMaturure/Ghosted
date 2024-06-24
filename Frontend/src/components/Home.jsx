import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../css/App.css";
import axios from "axios";
import items from '../data/products.json'
import { Link } from "react-router-dom";

function Home() {

    return <>
    <div className="home-container">
        <div className="filters flex">
            <div className="All"><h1>All</h1></div>
            <div className="Hoodies"><h1>Hoodies</h1></div>
            <div className="Shirts"><h1>Shirts</h1></div>
            <div className="Caps"><h1>Caps</h1></div>
            <div className="Sweaters"><h1>Sweaters</h1></div>
        </div>
        <p className="items-hint">You are Currently Being Shown all {items.products.length} Items.</p>
        <section className="items-cnt">
            { items.products.map((item)=>(
            <Link to={`/item/${item.id}`}>
              <div className='product'key={item.id}>
                
                <div className="product-img-cnt">
                <img src={item.img} alt="" />  
                </div>
                <h1 className="product-name">{item.name}</h1>
                <h1 className="product-price">R {item.price}</h1>  
              </div>  
            </Link>
            ))}
         
            

        </section>   <hr /><p style={{'fontFamily':"satoshi", fontWeight:"bold", textAlign:"right"}}>End of List.</p>
    </div>
    
    </>;
}

export default Home;
