import React, { useState } from "react";
import { calculateCartTotal, decryptString, encryptString } from "./util";

const AddToCartForm = ({ productDetails }) => {
    const [productQuantity, setProductQuantity] = useState(1);

    const handleAddToCart = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const formData = Object.fromEntries(fd.entries());

        if (!localStorage.getItem("encrypted"))
            localStorage.setItem(
                "encrypted",
                JSON.stringify({ items: [], subtotal: 0 })
            );

        let cart = JSON.parse(localStorage.getItem("encrypted"));

        let currentItem = {
            userOptions: formData,
            currentProduct: productDetails,
            total: productQuantity * productDetails.price,
            quantity: productQuantity,
        };

        const itemExists = cart.items.find(
            (item) =>
                item.currentProduct.id === currentItem.currentProduct.id &&
                item.userOptions.chosenColour === formData.chosenColour &&
                item.userOptions.chosenSize === formData.chosenSize
        );

        if (itemExists) {
            let updatedCartItems = cart.items.map((item) =>
                item.currentProduct.id === currentItem.currentProduct.id &&
                item.userOptions.chosenColour === formData.chosenColour &&
                item.userOptions.chosenSize === formData.chosenSize
                    ? {
                          ...item,
                          quantity: item.quantity + currentItem.quantity,
                          total:
                              (item.quantity + currentItem.quantity) *
                              item.currentProduct.price,
                      }
                    : item
            );

            let newSubTotal = calculateCartTotal(updatedCartItems);
            console.log(updatedCartItems);

            let updatedCart = {
                items: updatedCartItems,
                subtotal: newSubTotal,
            };

            localStorage.setItem("encrypted", JSON.stringify(updatedCart));
            return;
        }

        cart.items.push(currentItem);

        let newSubTotal = calculateCartTotal(cart.items);
        let updatedCart = { items: cart.items, subtotal: newSubTotal };

        localStorage.setItem("encrypted", JSON.stringify(updatedCart));
    };

    return (
        <form className="grid gap-6 lg:gap-8 px-6" onSubmit={handleAddToCart}>
            <div className="grid gap-1">
                <label
                    className="text-sm sm:text-base text-gray-500"
                    htmlFor="chosenColour">
                    Colours:{" "}
                </label>

                <select
                    id="chosenColour"
                    name="chosenColour"
                    className="flex gap-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg py-3 px-2">
                    {productDetails.colour.map((col) => (
                        <option key={col} className="" value={col}>
                            {col.charAt(0).toUpperCase() +
                                col.substring(1, col.length)}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid gap-1">
                <label
                    className="text-sm sm:text-base text-gray-500"
                    htmlFor="chosenSize">
                    Size:
                </label>

                <select
                    id="chosenSize"
                    name="chosenSize"
                    className="w-full py-3 px-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg">
                    {productDetails.size.map((size, index) => (
                        <option key={index} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-1">
                <label className="text-sm sm:text-base text-gray-500">
                    Quantity:{" "}
                </label>
                <div className="w-full py-3 px-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg flex justify-between">
                    <button
                        type="button"
                        className=""
                        disabled={productQuantity === 1}
                        onClick={() =>
                            setProductQuantity(
                                (prevQuantity) => prevQuantity - 1
                            )
                        }>
                        -
                    </button>
                    {productQuantity}
                    <button
                        type="button"
                        className=""
                        onClick={() =>
                            setProductQuantity(
                                (prevQuantity) => prevQuantity + 1
                            )
                        }>
                        +
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-gray-100 py-3 rounded-lg font-medium hover:bg-blue-500">
                Add to cart
            </button>
        </form>
    );
};

export default AddToCartForm;
