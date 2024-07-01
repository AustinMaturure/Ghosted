import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Footer from "./components/Footer.jsx";
import ItemDetail from "./components/ProductDetails/ItemDetail.jsx";
import Cart from "./components/Cart.jsx";
import PageNotFound from "./components/PageNotFound.jsx";

import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/item/:slug" element={<ItemDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </React.StrictMode>
);
