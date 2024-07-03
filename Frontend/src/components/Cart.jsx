import { useState } from "react";
import {
    calculateCartTotal,
    decryptString,
    encryptString,
} from "./ProductDetails/util";

export default function Cart() {
    const [cart, setCart] = useState(
        localStorage.getItem("encrypted")
            ? JSON.parse(localStorage.getItem("encrypted"))
            : localStorage.setItem(
                  "encrypted",
                  JSON.stringify({ items: [], subtotal: 0 })
              )
    );
    const secretKey =
        "4*,-jbWg<NJZo0,XF*AAdS3F`;Z_fy&8" +
        "qOFYH58oA8/!i8Y#;to4Z~o[w(`R<rtd" +
        "3k3a7dwN88BBkj71JTSndYbPQht66yML";

    const encryptedCart = encryptString(
        localStorage.getItem("encrypted"),
        secretKey
    );

    console.log(encryptedCart);
    const decryptCart = decryptString(encryptedCart, secretKey);
    console.log(decryptCart);

    if (cart.items.length < 1) {
        return <div>Your cart is empty</div>;
    }

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

        localStorage.setItem("encrypted", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const handleRemoveItem = (currentItemIndex) => {
        const itemRemoved = cart.items.filter(
            (item) => cart.items.indexOf(item) !== currentItemIndex
        );
        let newSubTotal = calculateCartTotal(itemRemoved);

        const updatedCart = { items: itemRemoved, subtotal: newSubTotal };
        localStorage.setItem("encrypted", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    return (
        <div className="container px-10 py-10">
            {cart.items.map((item, index) => (
                <div key={index} className="border flex">
                    <div className="h-12 w-12">
                        <img src={item.currentProduct.images[0]} alt="" />
                    </div>
                    <div>
                        <div>Name: {item.currentProduct.name}</div>
                        <div>
                            Quantity:{" "}
                            <button
                                onClick={() =>
                                    handleQuantityChange("decrement", index)
                                }
                                disabled={item.quantity === 1}
                                className="">
                                -
                            </button>{" "}
                            {item.quantity}{" "}
                            <button
                                onClick={() =>
                                    handleQuantityChange("increment", index)
                                }>
                                +
                            </button>
                        </div>
                        <div>Total: R{item.total}</div>
                        <div>
                            <span>Size: {item.userOptions.chosenSize} </span>
                            <span>Colour: {item.userOptions.chosenColour}</span>
                        </div>
                        <button
                            className="underline"
                            onClick={() => handleRemoveItem(index)}>
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <div>Subtotal: R{cart.subtotal}</div>
        </div>
    );
}
