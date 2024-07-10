import { useState } from "react";
import {
    calculateCartTotal,
    decryptString,
    encryptString,
} from "../ProductDetails/util";
import igImg from "../../assets/ig.svg";
import fbImg from "../../assets/fb.svg";
import wpImg from "../../assets/wp.svg";
import OrderDetails from "./OrderDetails";
import { Link } from "react-router-dom";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export default function Cart() {
    const [cart, setCart] = useState(
        localStorage.getItem("encrypted")
            ? JSON.parse(
                  decryptString(localStorage.getItem("encrypted"), SECRET_KEY)
              )
            : localStorage.setItem(
                  "encrypted",
                  encryptString(
                      JSON.stringify({ items: [], subtotal: 0 }),
                      SECRET_KEY
                  )
              )
    );

    const handleQuantityChange = (action, currentItemIndex) => {
        let updatedCartItems = cart.items.map((item) =>
            cart.items.indexOf(item) === currentItemIndex
                ? {
                      ...item,
                      quantity:
                          action === "decrement"
                              ? item.quantity - 1
                              : item.quantity + 1,
                      total:
                          action === "decrement"
                              ? (item.quantity - 1) * item.currentProduct.price
                              : (item.quantity + 1) * item.currentProduct.price,
                  }
                : item
        );

        let newSubTotal = calculateCartTotal(updatedCartItems);
        let updatedCart = { items: updatedCartItems, subtotal: newSubTotal };

        localStorage.setItem(
            "encrypted",
            encryptString(JSON.stringify(updatedCart), SECRET_KEY)
        );
        setCart(updatedCart);
    };

    const handleRemoveItem = (currentItemIndex) => {
        const itemRemoved = cart.items.filter(
            (item) => cart.items.indexOf(item) !== currentItemIndex
        );
        let newSubTotal = calculateCartTotal(itemRemoved);

        const updatedCart = { items: itemRemoved, subtotal: newSubTotal };
        localStorage.setItem(
            "encrypted",
            encryptString(JSON.stringify(updatedCart), SECRET_KEY)
        );
        setCart(updatedCart);
    };

    if (cart.items.length < 1) {
        return (
            <div className="container mx-auto mt-8 m-16 lg:mt-16 lg:mb-32 px-4 grid gap-6 lg:gap-20 grid-cols-1 lg:grid-cols-2">
                <div className="">
                    <div className="text-lg md:text-xl font-bold mb-3 heading-font">
                        My Cart
                    </div>
                    <div className="text-stone-600">
                        Your Cart Is Empty. Visit our{" "}
                        <Link
                            to={"/"}
                            className="cursor-pointer underline underline-offset-2 hover:text-teal-700">
                            Shop
                        </Link>
                        .
                    </div>
                </div>
                <div className=" lg:w-[28rem] lg:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]  lg:px-4 lg:rounded-lg lg:py-2 lg:h-max lg:border">
                    <div className="text-base md:text-lg my-3 font-bold">
                        Order Summary
                    </div>
                    <div className="flex justify-between items-center font-semibold mb-4 md:mb-5 lg:mb-6">
                        <div>Sub Total (Excluding Delivery)</div>
                        <div> R{cart.subtotal}</div>
                    </div>
                    <div className="grid gap-5">
                        <OrderDetails cart={cart} />
                        <div className="grid gap-3">
                            <div className="font-bold text-base md:text-lg">
                                Place Your Order{" "}
                            </div>
                            <div className="grid gap-2 ">
                                <div className="flex gap-2 md:gap-2 items-center">
                                    <div className="font-semibold rounded-full w-8  h-8 flex items-center justify-center bg-teal-800 text-stone-50">
                                        <div className="text-lg h-4 w-4 flex items-center justify-center">
                                            1
                                        </div>
                                    </div>

                                    <div className="text-base lg:text-lg h-10 flex items-center">
                                        Copy your order
                                    </div>
                                </div>
                                <div className="flex gap-2 md:gap-2 items-center">
                                    <div className="font-semibold rounded-full w-8  h-8 flex items-center justify-center bg-teal-800 text-stone-50">
                                        <div className="text-lg h-4 w-4 flex items-center justify-center">
                                            2
                                        </div>
                                    </div>
                                    <div className="text-base lg:text-lg h-10 flex items-center">
                                        Contact us on one of our socials below
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <a
                                    className=""
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <img
                                        src={igImg}
                                        alt="Instagram"
                                        className="w-10 lg:w-12"
                                    />
                                </a>
                                <a
                                    className=""
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <img
                                        src={fbImg}
                                        alt="Facebook"
                                        className="w-10 lg:w-12"
                                    />
                                </a>
                                <a
                                    className=""
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <img
                                        src={wpImg}
                                        alt="Whatsapp Logo"
                                        className="w-10 lg:w-12"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-8 m-16 lg:mt-16 lg:mb-32 px-4 flex gap-6 lg:gap-20 flex-col lg:flex-row relative justify-center">
            <div className="lg:w-[30rem]">
                <div className="flex justify-between items-center mb-3 md:mb-5 lg:mb-6">
                    <div className="text-lg md:text-xl font-bold heading-font">
                        My Cart{" "}
                    </div>
                    <div className="sm:hidden">{cart.items.length} items</div>
                </div>
                <div className="">
                    <div className="grid gap-3 lg:gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-6 lg:grid-cols-1">
                        {cart.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-3 sm:gap-6 border-b pb-3 lg:pb-6 ">
                                <Link
                                    to={`/product/${item.currentProduct.slug}`}
                                    key={item.id}>
                                    <img
                                        src={item.currentProduct.images[0]}
                                        alt=""
                                        className="h-24 w-24 sm:h-32 sm:w-32 lg:w-40 lg:h-40 bg-stone-100 rounded-lg object-cover"
                                    />
                                </Link>

                                <div className="w-full grid gap-1 sm:gap-2 lg:gap-3">
                                    <div className="flex justify-between items-center">
                                        <Link
                                            to={`/product/${item.currentProduct.slug}`}
                                            key={item.id}>
                                            <div className="text-base sm:text-lg font-medium">
                                                {item.currentProduct.name}
                                            </div>
                                        </Link>
                                        <div className="text-base sm:text-lg font-semibold">
                                            R{item.total}
                                        </div>
                                    </div>

                                    <div className="text-sm">
                                        <span>
                                            Size: {item.userOptions.chosenSize}
                                            {", "}
                                        </span>
                                        <span>
                                            Colour:{" "}
                                            {item.userOptions.chosenColour
                                                .charAt(0)
                                                .toUpperCase() +
                                                item.userOptions.chosenColour.substring(
                                                    1,
                                                    item.userOptions
                                                        .chosenColour.length
                                                )}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-sm">
                                            Quantity:
                                        </div>
                                        <div className="w-full flex justify-between border border-stone-200 px-2 py-1 rounded-lg">
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        "decrement",
                                                        index
                                                    )
                                                }
                                                disabled={item.quantity === 1}
                                                className="">
                                                -
                                            </button>{" "}
                                            {item.quantity}{" "}
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        "increment",
                                                        index
                                                    )
                                                }>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className="underline underline-offset-2 text-stone-600 hover:text-teal-700"
                                            onClick={() =>
                                                handleRemoveItem(index)
                                            }>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className=" lg:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]  lg:w-[28rem] lg:rounded-lg lg:p-6 lg:h-max lg:border lg:sticky lg:top-16">
                <div className="text-base md:text-lg my-3 font-bold">
                    Order Summary
                </div>
                <div className="flex justify-between text-sm md:text-base items-center font-semibold mb-4 md:mb-5 lg:mb-6">
                    <div>Sub Total (Excluding Delivery)</div>
                    <div> R{cart.subtotal}</div>
                </div>
                <div className="grid gap-3 lg:gap-6">
                    <OrderDetails cart={cart} />
                    <div className="grid gap-6">
                        <div className="font-bold text-base md:text-lg">
                            Place Your Order{" "}
                        </div>
                        <div className="grid gap-2 ">
                            <div className="flex gap-2 md:gap-2 items-center">
                                <div className="font-semibold rounded-full w-8  h-8 flex items-center justify-center bg-teal-800 text-stone-50">
                                    <div className="text-lg h-4 w-4 flex items-center justify-center">
                                        1
                                    </div>
                                </div>

                                <div className="text-base lg:text-lg h-10 flex items-center">
                                    Copy your order
                                </div>
                            </div>
                            <div className="flex gap-2 md:gap-2 items-center">
                                <div className="font-semibold rounded-full w-8  h-8 flex items-center justify-center bg-teal-800 text-stone-50">
                                    <div className="text-lg h-4 w-4 flex items-center justify-center">
                                        2
                                    </div>
                                </div>

                                <div className="text-base lg:text-lg h-10 flex items-center">
                                    Contact us on one of our socials below
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <a
                                className=""
                                href=""
                                target="_blank"
                                rel="noopener noreferrer">
                                <img
                                    src={igImg}
                                    alt="Instagram"
                                    className="w-10 lg:w-12"
                                />
                            </a>
                            <a
                                className=""
                                href=""
                                target="_blank"
                                rel="noopener noreferrer">
                                <img
                                    src={fbImg}
                                    alt="Facebook"
                                    className="w-10 lg:w-12"
                                />
                            </a>
                            <a
                                className=""
                                href=""
                                target="_blank"
                                rel="noopener noreferrer">
                                <img
                                    src={wpImg}
                                    alt="Whatsapp Logo"
                                    className="w-10 lg:w-12"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
