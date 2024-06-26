import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import productData from "../../data.json";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";

export default function ItemDetail() {
    const { slug } = useParams();
    const [productDetails, setProductDetails] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // const productId = parseInt(id); // remove in production

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(
                `https://ghosted.pythonanywhere.com/api/products/${slug}/`
            );

            if (!response.ok) {
                throw new Error("Error fetching product details");
            }

            const resData = await response.json();
            console.log(resData);
            setProductDetails(resData); // remove in production
        } catch (err) {
            console.log(err);
            setErrorMessage("Error fetching product details" || err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // fetchProductDetails(); // uncomment during production
        setProductDetails(productData);
        setIsLoading(false);
    }, []);

    console.log("component re-render");
    if (isLoading) return <div>Skeleton...</div>;
    if (errorMessage)
        return (
            <div>
                There has been an error. Please check your connection or refresh
                the page
            </div>
        );

    return (
        <main className="">
            <ProductImages images={productDetails.images} />
            <ProductDetails productDetails={productDetails} />
        </main>
    );
}
