import { useState } from "react";
import {
    calculateCartTotal,
    decryptString,
    encryptString,
} from "../ProductDetails/util";
import igImg from "../../assets/ig.svg";
import fbImg from "../../assets/fb.svg";
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
            <div className="my-10 mx-auto px-10 grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-10">
                <div className="text-gray-600">
                    Your Cart Is Empty. Go to our{" "}
                    <Link
                        to={"/"}
                        className="cursor-pointer underline underline-offset-2 hover:text-blue-500">
                        Shop
                    </Link>
                </div>
                <div>
                    <div className="text-xl my-3 font-bold">Summary</div>
                    <div className="flex justify-between items-center font-semibold mb-4">
                        <div>Subtotal</div>
                        <div> R{cart.subtotal}</div>
                    </div>
                    <div className="grid gap-5">
                        <OrderDetails cart={cart} />
                        <div className="grid gap-2">
                            <div className="font-medium">Contact Us: </div>
                            <div className="">
                                Copy your order and contact us on one of our
                                socials below
                            </div>
                            <div className="flex">
                                <a
                                    className=""
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <img
                                        src={igImg}
                                        alt="Instagram"
                                        className="w-8 lg:w-12"
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
                                        className="w-8 lg:w-12"
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
        <div className="container my-10 mx-auto px-3 grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-12">
            <div>
                <div className="flex justify-between items-center mb-3">
                    <div className="text-lg md:text-xl font-bold">My Cart</div>
                    <div className="sm:hidden">{cart.items.length} items</div>
                </div>
                <div className="">
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-1">
                        {cart.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-3 sm:gap-6 border-b pb-6 ">
                                <Link
                                    to={`/item/${item.currentProduct.slug}`}
                                    key={item.id}>
                                    <img
                                        src={item.currentProduct.images[0]}
                                        alt=""
                                        className="h-24 w-24 sm:h-32 sm:w-32 bg-gray-50 rounded-md object-contain"
                                    />
                                </Link>

                                <div className="w-full grid gap-2">
                                    <div className="flex justify-between items-center">
                                        <Link
                                            to={`/item/${item.currentProduct.slug}`}
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
                                            {item.userOptions.chosenColour}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-sm">
                                            Quantity:
                                        </div>
                                        <div className="w-full flex justify-between border-[0.75px] border-gray-200 px-2 py-1 rounded-lg">
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
                                            className="underline underline-offset-1 text-gray-600 hover:text-gray-500"
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
            <div className="lg:border-l lg:pl-4">
                <div className="text-lg md:text-xl my-3 font-bold">Summary</div>
                <div className="flex justify-between items-center font-semibold mb-4">
                    <div>Subtotal</div>
                    <div> R{cart.subtotal}</div>
                </div>
                <div className="grid gap-5">
                    <OrderDetails cart={cart} />
                    <div className="grid gap-2">
                        <div className="font-medium">Contact Us </div>
                        <div className="">
                            Copy your order and contact us on one of our socials
                            below
                        </div>
                        <div className="flex">
                            <a
                                className=""
                                href=""
                                target="_blank"
                                rel="noopener noreferrer">
                                <img
                                    src={igImg}
                                    alt="Instagram"
                                    className="w-8 lg:w-12"
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
                                    className="w-8 lg:w-12"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
