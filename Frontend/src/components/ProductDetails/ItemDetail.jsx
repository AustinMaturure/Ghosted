import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import LoadingSkeleton from "./LoadingSkeleton";

export default function ItemDetail() {
    const { slug } = useParams();
    const [productDetails, setProductDetails] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(
                `https://ghosted.pythonanywhere.com/api/products/${slug}/`
            );

            if (!response.ok) {
                throw new Error("Error fetching product details");
            }

            const resData = await response.json();
            setProductDetails(resData);
        } catch (err) {
            console.log(err);
            setErrorMessage("Error fetching product details" || err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);

    console.log("component re-render");
    if (isLoading) return <LoadingSkeleton />;
    if (errorMessage)
        return (
            <div>
                There has been an error. Please check your connection or refresh
                the page
            </div>
        );

    return (
        <main className="container mx-auto flex flex-col  lg:flex-row gap-10 lg:gap-12 sm:px-1 py-12 lg:py-0 lg:px-24">
            <ProductImages images={productDetails.images} />
            <div className="lg:border-l-[0.75px] lg:border-r-[0.75px] sm:border-gray-100 lg:py-10 flex flex-col gap-6 lg:gap-8">
                <div className="flex justify-between text-xl px-6 font-medium lg:text-2xl">
                    <div className=" uppercase tracking-wide">
                        {productDetails.name}
                    </div>
                    <div className="">R{productDetails.price}</div>
                </div>
                <ProductDetails productDetails={productDetails} />
            </div>
        </main>
    );
}
