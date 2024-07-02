import React, { useState } from "react";
import CryptoJS from "crypto-js";

const AddToCartForm = ({ productDetails }) => {
    const [productQuantity, setProductQuantity] = useState(1);
    const secretKey =
        "4*,-jbWg<NJZo0,XF*AAdS3F`;Z_fy&8" +
        "qOFYH58oA8/!i8Y#;to4Z~o[w(`R<rtd" +
        "3k3a7dwN88BBkj71JTSndYbPQht66yML";

    const encrypt = (plainText) => {
        const cipherText = CryptoJS.AES.encrypt(
            plainText,
            secretKey
        ).toString();
        return cipherText;
    };

    const decrypt = (cipherText) => {
        const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
        const plainText = bytes.toString(CryptoJS.enc.Utf8);
        return plainText;
    };

    const encryption = encrypt("My name is faiz");
    const decryption = decrypt(encryption);
    console.log(encryption);
    console.log(decryption);

    const handleAddToCart = (e) => {
        e.preventDefault();
        console.log("Add product Cart to cart/local storage");
        const fd = new FormData(e.target);
        const formData = Object.fromEntries(fd.entries());
        const item = { ...formData, quantity: productQuantity };
        var existing = localStorage.getItem("myFavoriteSandwich");

        // If no existing data, use the value by itself
        // Otherwise, add the new value to it
        var data = existing ? existing + " and tuna" : "tuna";

        // Save back to localStorage

        console.log(item);
        // at the end of adding this to local storage, reset product quantity
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
                        onClick={() =>
                            setProductQuantity((prevQuantity) =>
                                prevQuantity >= 2
                                    ? prevQuantity - 1
                                    : prevQuantity
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
