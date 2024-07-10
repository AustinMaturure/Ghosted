import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductImages from "./ProductImages";
import LoadingSkeleton from "./LoadingSkeleton";
import ShowCart from "../Cart/ShowCart";
import AddToCartForm from "./AddToCartForm";
import ProductDetailsTabs from "./ProductDetailsTabs";
import { decryptString, encryptString } from "./util";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export default function ItemDetail() {
    const { slug } = useParams();
    const [productDetails, setProductDetails] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState(
        localStorage.getItem("encrypted")
            ? JSON.parse(
                  decryptString(localStorage.getItem("encrypted"), SECRET_KEY)
              )
            : localStorage.setItem(
                  "encrypted",
                  encryptString(
                      JSON.stringify({ items: [], subtotal: 0 }),
                      SECRET_KEY
                  )
              )
    );
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        setCart(
            JSON.parse(
                decryptString(localStorage.getItem("encrypted"), SECRET_KEY)
            )
        );
    }, [modalOpened]);

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
            // console.log(err);
            setErrorMessage("Error fetching product details" || err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchProductDetails();
    }, [slug]);

    if (isLoading) return <LoadingSkeleton />;
    if (errorMessage)
        return (
            <div>
                There has been an error. Please check your connection or refresh
                the page
            </div>
        );

    return (
        <main className="container mx-auto flex flex-col lg:flex-row gap-6 lg:gap-12 sm:px-1 py-12 lg:py-0 relative">
            <div className="flex justify-between text-xl px-6 md:px-20 font-medium lg:hidden">
                <div className="uppercase tracking-wide heading-font">
                    {productDetails.name}
                </div>
                <div className="font-bold">R{productDetails.price}</div>
            </div>
            <ProductImages images={productDetails.images} />
            <div className="lg:border-l lg:border-r sm:border-stone-100 lg:py-10 flex flex-col gap-6 lg:gap-8 lg:w-[30rem]">
                <div className="hidden justify-between text-xl px-6 font-medium lg:text-2xl lg:flex ">
                    <div className=" uppercase tracking-wide heading-font">
                        {productDetails.name}
                    </div>
                    <div className="font-bold">R{productDetails.price}</div>
                </div>
                <div className=" grid gap-8 lg:gap-6">
                    <AddToCartForm
                        productDetails={productDetails}
                        modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                    />
                    <ProductDetailsTabs productDetails={productDetails} />
                </div>
            </div>
            <ShowCart
                cart={cart}
                setModalOpened={setModalOpened}
                modalOpened={modalOpened}
            />
        </main>
    );
}
