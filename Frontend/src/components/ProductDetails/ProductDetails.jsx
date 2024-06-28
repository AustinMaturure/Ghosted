import { useState } from "react";
import ProductImages from "./ProductImages";
import ProductDetailsTabs from "./ProductDetailsTabs";
import AddToCartForm from "./AddToCartForm";

const ProductDetails = ({ productDetails }) => {
    return (
        <section className="lg:w-[30rem] grid gap-8 lg:gap-10">
            <AddToCartForm productDetails={productDetails} />
            <ProductDetailsTabs productDetails={productDetails} />
        </section>
    );
};

export default ProductDetails;
