import { useState } from "react";

const ProductImages = ({ images }) => {
    const [imgIndex, setImgIndex] = useState(0);
    return (
        <section className="">
            <div className="">
                <div className="">
                    {images.map((imageUrl, index) => (
                        <div
                            key={index}
                            className=""
                            onClick={() =>
                                setImgIndex(images.indexOf(imageUrl))
                            }>
                            <img src={imageUrl} alt="" className="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="">
                <img src={images[imgIndex]} alt="" className="" />
            </div>
        </section>
    );
};

export default ProductImages;
