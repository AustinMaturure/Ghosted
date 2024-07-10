import { useState } from "react";
import { generateInvoice } from "../ProductDetails/util";
import { ChevronDown, ChevronUp } from "lucide-react";
import PropTypes from "prop-types";

const OrderDetails = ({ cart, handleOrderCopied }) => {
    const [textCopied, setTextCopied] = useState(false);
    const [expandText, setExpandText] = useState(false);

    const customerOrderLayout = (
        <>
            <div>Hello there. I would like to place an order for:</div>
            <div className="my-2">
                {cart.items.map((item, index) => (
                    <div key={index}>
                        {index + 1}. Product ID: {item.currentProduct.id} -{" "}
                        {item.currentProduct.name} - Price:{" R"}
                        {item.currentProduct.price} - Quantity: {item.quantity}{" "}
                        - Size: {item.userOptions.chosenSize} - Colour:{" "}
                        {item.userOptions.chosenColour.charAt(0).toUpperCase() +
                            item.userOptions.chosenColour.substring(
                                1,
                                item.userOptions.chosenColour.length
                            )}{" "}
                        - Item Sub Total: R{item.total}
                    </div>
                ))}
            </div>
            <div>Cart Sub Total(Excluding Delivery): R{cart.subtotal}</div>
        </>
    );

    const customerOrder = generateInvoice(cart);

    return (
        <div className="grid gap-4 md:gap-5 lg:gap-6">
            <div className="relative py-8 px-4 rounded-lg bg-stone-50">
                <div
                    className={`text-sm sm:text-base overflow-y-auto text-stone-600 overscroll-contain ${
                        expandText ? "block" : "max-h-20 lg:max-h-32"
                    }`}>
                    {customerOrderLayout}
                </div>

                <button
                    disabled={cart.subtotal === 0}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 disabled:font-light disabled:cursor-not-allowed"
                    onClick={() =>
                        setExpandText((prevExpandText) => !prevExpandText)
                    }>
                    {expandText ? <ChevronUp /> : <ChevronDown />}
                </button>
            </div>
            <div className="relative">
                <button
                    disabled={cart.subtotal === 0 || textCopied}
                    className="w-full bg-teal-800 hover:bg-teal-700 text-stone-100 py-3 rounded-lg font-medium disabled:cursor-not-allowed transition-all ease-out"
                    onClick={async () => {
                        await navigator.clipboard.writeText(customerOrder);
                        setTextCopied(true);
                        setTimeout(() => {
                            setTextCopied(false);
                        }, 1500);
                        handleOrderCopied();
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}>
                    {!textCopied ? "Copy Order" : "Order Copied"}
                </button>
            </div>
        </div>
    );
};

OrderDetails.propTypes = {
    cart: PropTypes.object,
    handleOrderCopied: PropTypes.bool,
};

export default OrderDetails;
