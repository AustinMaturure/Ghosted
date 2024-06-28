import React from "react";

const AddToCartForm = ({ productDetails }) => {
    const handleAddToCart = (e) => {
        e.preventDefault();
        console.log("Add product Cart to cart/local storage");
    };

    return (
        <form className="grid gap-6 lg:gap-8 px-6 ">
            <div className="grid gap-1">
                <label className="text-sm sm:text-base text-gray-500">
                    Colours:{" "}
                </label>

                <select className="flex gap-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg py-3 px-2">
                    {productDetails.colour.map((col) => (
                        <option key={col} className="">
                            {col.charAt(0).toUpperCase() +
                                col.substring(1, col.length)}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid gap-1">
                <label className="text-sm sm:text-base text-gray-500">
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

            <div>
                <button
                    type="submit"
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 text-gray-100 py-3 rounded-lg">
                    Add to cart
                </button>
            </div>
        </form>
    );
};

export default AddToCartForm;
