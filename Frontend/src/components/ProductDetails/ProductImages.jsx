import { useState } from "react";

const ProductImages = ({ images }) => {
    const [imgIndex, setImgIndex] = useState(0);
    return (
        <section className="grid justify-center lg:py-10">
            <div className="flex flex-col-reverse sm:px-0 max-w-[40rem] lg:flex-col gap-2 xl:flex-row lg:gap-6">
                <div className="flex justify-center lg:justify-start">
                    <div className="flex gap-2 mt-[-20px] lg:mt-0 xl:flex-col">
                        {images.map((imageUrl, index) => (
                            <div
                                key={index}
                                className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg bg-gray-50 w-12 h-12"
                                onClick={() =>
                                    setImgIndex(images.indexOf(imageUrl))
                                }>
                                <img
                                    src={imageUrl}
                                    alt=""
                                    className={`h-auto w-full block object-contain rounded-lg ${
                                        imgIndex === index &&
                                        "border border-solid border-blue-500 "
                                    }`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className=" sm:rounded-xl">
                    <img
                        src={images[imgIndex]}
                        alt=""
                        className="h-auto w-full block object-contain sm:rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductImages;
