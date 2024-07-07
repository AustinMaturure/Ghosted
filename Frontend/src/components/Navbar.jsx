import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";
import deliveryImg from "../assets/delivery.svg";
import closeImg from "../assets/close.svg";
import logo from "../assets/logo/logos.svg";
import search from "../assets/logo/search.svg";
import menu from "../assets/logo/menu.svg";
import cart from "../assets/logo/cart1.svg";

export default function Navbar({ isOpen, toggleNavbar }) {
    const [visible, setVisibility] = useState(true);
    const [svisible, setsVisibility] = useState(true);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [img, setImg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                setIsLoading(true);
                try {
                    const response = await fetch(
                        `https://ghosted.pythonanywhere.com/api/search/?query=${query}`
                    );
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const jsonData = await response.json();
                    setData(jsonData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setData([]);
            }
        };

        fetchData();
    }, [query]);

    const toggleHamImg = () => {
        setImg(!img);
    };
    useEffect(() => {
        setImg(false);
    }, [useLocation()]);

    return (
        <>
            {/* Delivery banner */}
            <div className={`delivery-banner flex ${visible ? "" : "hide"}`}>
                <div className="delivery-img-cnt">
                    <img src={deliveryImg} alt="Delivery" />
                </div>
                <p>NATIONWIDE DELIVERY AVAILABLE</p>
                <div
                    className="close-img-cnt"
                    onClick={() => setVisibility(false)}>
                    <img src={closeImg} alt="Close" />
                </div>
            </div>

            {/* Navbar */}
            <nav className="navbar">
                <div className="menu-img-cnt" onClick={toggleNavbar}>
                    <img
                        onClick={
                            useLocation().pathname === "/" ? toggleHamImg : {}
                        }
                        src={`${img ? closeImg : menu}`}
                        alt="Menu"
                    />
                </div>
                <Link to={"/"}>
                    <div className="logo-img-cnt">
                        <img src={logo} alt="Logo" />
                    </div>
                </Link>
                <div className="nav-right">
                    <div
                        className="search-img-cnt"
                        onClick={() => setsVisibility(!svisible)}>
                        <img src={search} alt="Search" />
                    </div>
                    <div className="cart-img-cnt">
                        <Link to={"/cart"}>
                            <img src={cart} alt="Cart" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Search box */}
            {svisible ? (
                <>
                    <div
                        className={`search-box ${
                            !svisible ? "" : "search-hide"
                        }`}>
                        <div className="search">
                            <input
                                className="search-ipt"
                                type="text"
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                                placeholder="Enter Search Query"
                            />
                            <button
                                className="search-btn"
                                type="button"
                                onClick={() => setQuery(query)}>
                                <div className="search-img-cnt">
                                    <img src={search} alt="Search" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="search-hint">
                        {isLoading && query.length > 1 ? (
                            <p style={{ fontFamily: "Oswald", color: "#fff" }}>
                                Looking...
                            </p>
                        ) : query.length > 1 ? (
                            data.map((result, index) => (
                                <div className="search-hint-link" key={index}>
                                    <p>
                                        <Link
                                            to={`item/${result.name.replace(
                                                / /g,
                                                "-"
                                            )}`}>
                                            {result.name}
                                        </Link>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
