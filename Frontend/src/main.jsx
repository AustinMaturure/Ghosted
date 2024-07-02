import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Footer from './components/Footer.jsx';
import ItemDetail from './components/ItemDetail.jsx';
import Cart from './components/Cart.jsx';
import PageNotFound from './components/PageNotFound.jsx';

import './index.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <BrowserRouter>
      <Navbar isOpen={isOpen} toggleNavbar={toggleNavbar} />
      <Routes>
        <Route path="/" element={<Home isOpen={isOpen} setIsOpen={setIsOpen} />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
