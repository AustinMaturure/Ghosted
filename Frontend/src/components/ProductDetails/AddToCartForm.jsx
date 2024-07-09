import { useState } from "react";
import { calculateCartTotal, decryptString, encryptString } from "./util";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const AddToCartForm = ({ productDetails, setModalOpened, modalOpened }) => {
    const [productQuantity, setProductQuantity] = useState(1);

    const handleAddToCart = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const formData = Object.fromEntries(fd.entries());

        if (!localStorage.getItem("encrypted"))
            localStorage.setItem(
                "encrypted",
                encryptString(
                    JSON.stringify({ items: [], subtotal: 0 }),
                    SECRET_KEY
                )
            );

        let cart = JSON.parse(
            decryptString(localStorage.getItem("encrypted"), SECRET_KEY)
        );

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

            let updatedCart = {
                items: updatedCartItems,
                subtotal: newSubTotal,
            };

            localStorage.setItem(
                "encrypted",
                encryptString(JSON.stringify(updatedCart), SECRET_KEY)
            );
            setModalOpened(true);
            return;
        }

        cart.items.push(currentItem);

        let newSubTotal = calculateCartTotal(cart.items);
        let updatedCart = { items: cart.items, subtotal: newSubTotal };
        setModalOpened(true);
        localStorage.setItem(
            "encrypted",
            encryptString(JSON.stringify(updatedCart), SECRET_KEY)
        );
    };

    return (
        <form className="grid gap-3 lg:gap-5 px-6" onSubmit={handleAddToCart}>
            <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1">
                    <label
                        className="text-sm sm:text-base text-stone-500"
                        htmlFor="chosenColour">
                        Colours{" "}
                    </label>

                    <select
                        id="chosenColour"
                        name="chosenColour"
                        className=" shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg py-3 px-2">
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
                        className="text-sm sm:text-base text-stone-500"
                        htmlFor="chosenSize">
                        Size
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
            </div>

            <div className="grid gap-1">
                <label className="text-sm sm:text-base text-stone-500">
                    Quantity{" "}
                </label>
                <div className="py-3 px-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg flex justify-between">
                    <button
                        type="button"
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
                        onClick={() =>
                            setProductQuantity(
                                (prevQuantity) => prevQuantity + 1
                            )
                        }>
                        +
                    </button>
                </div>
            </div>
            <div className="relative">
                <button
                    type="submit"
                    className="w-full bg-teal-800 hover:bg-teal-700 text-stone-100 py-3 rounded-lg font-medium  disabled:cursor-not-allowed"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        })
                    }>
                    Add To Cart
                </button>
                {modalOpened && (
                    <div className="bg-black h-full opacity-25 w-full absolute right-0 top-0 rounded-lg hover:cursor-not-allowed"></div>
                )}
            </div>
        </form>
    );
};

export default AddToCartForm;
