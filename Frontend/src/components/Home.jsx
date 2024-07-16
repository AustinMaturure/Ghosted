import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/App.css";

// Filter function to filter items based on the selected category
const Filter = (category, items) => {
    if (!category) {
        return items;
    }
    return items.filter((item) => item.category.name === category);
};

function Home({ isOpen, setIsOpen }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState(null);
    const filteredItems = Filter(category, data);
    const location = useLocation();

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    "https://ghosted.pythonanywhere.com/api/products/"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return isLoading ? (
        <div className="container mx-auto">
            <p className="items-hint">
                You are Currently Being Shown all {filteredItems.length} Items.
            </p>
            <section className="items-cnt">
                <div className="product skel grad-animation"></div>
                <div className="product skel grad-animation"></div>
                <div className="product skel grad-animation"></div>
                <div className="product skel grad-animation"></div>
            </section>
        </div>
    ) : (
        <div className="">
            {location.pathname === "/" ? (
                <div
                    className={`filters flex ${
                        isOpen ? "show-nav" : "hide-nav"
                    }`}>
                    <div className="All" onClick={() => setCategory(null)}>
                        <h1>All</h1>
                    </div>
                    <div
                        className="Sweaters"
                        onClick={() => setCategory("sweaters")}>
                        <h1>Sweaters</h1>
                    </div>
                    <div
                        className="Shirts"
                        onClick={() => setCategory("shirts")}>
                        <h1>Shirts</h1>
                    </div>
                    <div className="Caps" onClick={() => setCategory("caps")}>
                        <h1>Caps</h1>
                    </div>
                    <div
                        className="Hoodies"
                        onClick={() => setCategory("hoodies")}>
                        <h1>Hoodies</h1>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className="container mx-auto">
                <p className="items-hint">
                    You are Currently Being Shown all {filteredItems.length}{" "}
                    Items.
                </p>
                <section className="items-cnt">
                    {filteredItems
                        .map((item) => (
                            <Link to={`/product/${item.slug}`} key={item.id}>
                                <div className="product">
                                    <div className="product-img-cnt">
                                        <img src={item.images[0]} alt="" />
                                    </div>
                                    <h1 className="product-name">
                                        {item.name}
                                    </h1>
                                    <h1 className="product-price">
                                        R {item.price}
                                    </h1>
                                </div>
                            </Link>
                        ))
                        .reverse()}
                </section>
                <hr />
                <p
                    style={{
                        fontFamily: "satoshi",
                        fontWeight: "bold",
                        textAlign: "right",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                    }}>
                    End of List.
                </p>
            </div>
        </div>
    );
}

export default Home;
