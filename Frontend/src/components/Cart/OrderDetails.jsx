import { useState } from "react";
import { generateInvoice } from "../ProductDetails/util";
import { ChevronDown, ChevronUp } from "lucide-react";

const OrderDetails = ({ cart }) => {
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
                        {item.userOptions.chosenColour} - Item Sub Total: R
                        {item.total}
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
                    className={`text-sm sm:text-base  overflow-y-auto text-stone-600 ${
                        expandText ? "block" : "max-h-20 lg:max-h-32"
                    }`}>
                    {customerOrderLayout}
                </div>

                <button
                    disabled={cart.subtotal === 0 || textCopied}
                    className="absolute top-2 right-3 transition-all disabled:font-light disabled:cursor-not-allowed"
                    onClick={async () => {
                        await navigator.clipboard.writeText(customerOrder);
                        setTextCopied(true);
                        setTimeout(() => {
                            setTextCopied(false);
                        }, 2000);
                    }}>
                    {!textCopied ? "Copy" : "Copied"}
                </button>
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
                    className="w-full bg-teal-800 hover:bg-teal-700 text-stone-100 py-3 rounded-lg font-medium disabled:cursor-not-allowed"
                    onClick={async () => {
                        await navigator.clipboard.writeText(customerOrder);
                        setTextCopied(true);
                        setTimeout(() => {
                            setTextCopied(false);
                        }, 3000);
                    }}>
                    {!textCopied ? "Copy Order" : "Order Copied"}
                </button>
            </div>
        </div>
    );
};

export default OrderDetails;
