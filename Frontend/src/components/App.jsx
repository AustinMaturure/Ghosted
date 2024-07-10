import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Footer from "./Footer.jsx";
import ItemDetail from "./ProductDetails/ItemDetail.jsx";
import Cart from "./Cart/Cart.jsx";
import PageNotFound from "./PageNotFound.jsx";
import { useState } from "react";

const App = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <BrowserRouter>
            <Navbar isOpen={isOpen} toggleNavbar={toggleNavbar} />
            <Routes>
                <Route
                    path="/"
                    element={<Home isOpen={isOpen} setIsOpen={setIsOpen} />}
                />
                <Route path="/product/:slug" element={<ItemDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
