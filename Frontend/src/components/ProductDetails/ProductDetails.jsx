import { useState } from "react";

const ProductDetails = ({ productDetails }) => {
    const [tabContent, setTabContent] = useState("");
    return (
        <section className="">
            <div className="">
                <div className="">
                    <h1 className="">{productDetails.name}</h1>
                    <div>R{productDetails.price}</div>
                </div>
                <div>
                    <div>Available Colours: </div>
                    <div className="">
                        {productDetails.colour.map((col) => (
                            <div key={col} className="">
                                {col.charAt(0).toUpperCase() +
                                    col.substring(1, col.length)}
                            </div>
                        ))}
                    </div>
                </div>
                <fieldset className="border">
                    <legend className="">Size</legend>
                    <select
                        id="chosenSize"
                        name="chosenSize"
                        className="w-full">
                        {productDetails.size.map((size, index) => (
                            <option key={index} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </fieldset>

                <div>
                    <button>Add to cart</button>
                </div>
                <div>
                    <div>
                        <button>Description</button>
                        <button>Product Details</button>
                        <button>Delivery Details</button>
                    </div>
                    <div>
                        Product Details - Lorem ipsum dolor sit, amet
                        consectetur adipisicing elit. Alias at placeat ipsum
                        laboriosam repellendus laborum exercitationem ea nam
                        maxime quasi! Perspiciatis modi maiores esse omnis
                        maxime voluptatibus vero ipsa odit!
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
