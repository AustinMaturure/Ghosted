import { Link } from "react-router-dom";
import { X } from "lucide-react";
import PropTypes from "prop-types";

const ShowCart = ({ cart, setModalOpened, modalOpened }) => {
    return (
        <div
            className={`${modalOpened ? "grid" : " hidden"} absolute top-1
                 w-full sm:w-96 bg-white px-3 py-4 gap-3  sm:right-0  rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]`}>
            <div className="flex justify-between px-4 py-2">
                <div className="flex justify-center w-full">
                    <div className="font-semibold">Added To Cart</div>
                </div>
                <X
                    className="cursor-pointer"
                    onClick={() => setModalOpened(false)}
                />
            </div>
            <div
                className={`overflow-y-auto h-60 border-t border-b py-2 overscroll-contain`}>
                <div className="">
                    <div className="grid gap-2 ">
                        {cart.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-3 sm:gap-6 pb-6 border-b ">
                                <Link
                                    to={`/item/${item.currentProduct.slug}`}
                                    key={item.id}>
                                    <img
                                        src={item.currentProduct.images[0]}
                                        alt=""
                                        className="h-24 w-24 sm:h-32 sm:w-32 bg-stone-50 rounded-md object-contain"
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

                                    <div className="mb-1 text-sm">
                                        Quantity: {item.quantity}{" "}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center font-medium mb-4">
                    <div>Subtotal</div>
                    <div> R{cart.subtotal}</div>
                </div>
            </div>
            <Link to={"/cart"}>
                <button className="w-full bg-teal-800 hover:bg-teal-700 text-stone-100 py-3 rounded-lg font-medium  disabled:cursor-not-allowed">
                    View Cart ({cart.items.length})
                </button>
            </Link>
        </div>
    );
};

ShowCart.propTypes = {
    cart: PropTypes.object,
    setModalOpened: PropTypes.func,
    modalOpened: PropTypes.bool,
};

export default ShowCart;
