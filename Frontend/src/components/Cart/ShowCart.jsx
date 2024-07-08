import { Link } from "react-router-dom";
import { X } from "lucide-react";

const ShowCart = ({ cart, setModalOpened, modalOpened }) => {
    return (
        <div
            className={`${modalOpened ? "grid z-10" : "hidden"} absolute top-0
                 w-full bg-white px-3 py-4 gap-3 sm:w-96 sm:right-0 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg`}>
            <div className="flex justify-between px-4 py-2">
                <div className="flex justify-center w-full">
                    <div>Added To Cart</div>
                </div>
                <X
                    className="cursor-pointer"
                    onClick={() => setModalOpened(false)}
                />
            </div>
            <div className={`overflow-y-auto h-60 border-t border-b py-2`}>
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
                <button className="w-full bg-teal-800 hover:bg-teal-700 text-gray-100 py-3 rounded-lg font-medium  disabled:cursor-not-allowed">
                    View Cart ({cart.items.length})
                </button>
            </Link>
        </div>
    );
};

export default ShowCart;
