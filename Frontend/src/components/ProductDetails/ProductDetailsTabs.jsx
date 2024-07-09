import { useState } from "react";

const ProductDetailsTabs = ({ productDetails }) => {
    const [currentTab, setCurrentTab] = useState("description");

    let tabContent = "";

    if (currentTab === "description") {
        tabContent = <p>{productDetails.description}</p>;
    }
    if (currentTab === "deliver") {
        tabContent = <p>productDetails.delivery</p>;
    }
    if (currentTab === "materials") {
        tabContent = <p>{productDetails.materials}</p>;
    }

    return (
        <div className="grid gap-2 ">
            <div className="flex justify-between border-t-[0.75px] border-b text-stone-600 font-light px-6 text-sm sm:text-base">
                <button
                    onClick={() => setCurrentTab("description")}
                    className={
                        currentTab === "description"
                            ? "py-3 border-b-2 border-b-stone-900 text-stone-900 font-normal"
                            : "py-3 border-b-2 border-white"
                    }>
                    Product Details
                </button>
                <button
                    onClick={() => setCurrentTab("materials")}
                    className={
                        currentTab === "materials"
                            ? "py-3 border-b-2 border-b-stone-900 text-stone-900 font-normal"
                            : "py-3 border-b-2 border-white"
                    }>
                    Product Materials
                </button>
                <button
                    onClick={() => setCurrentTab("delivery")}
                    className={
                        currentTab === "delivery"
                            ? "py-3 border-b-2 border-b-stone-900 text-stone-900 font-normal"
                            : "py-3 border-b-2 border-white"
                    }>
                    Delivery Details
                </button>
            </div>
            <div className="px-6 ">{tabContent}</div>
        </div>
    );
};

export default ProductDetailsTabs;
