import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/nav";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const Shopping = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartList, setCartList] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/ecommerce/products`
        );
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartList(JSON.parse(savedCart));
      } catch (error) {
        console.error("Unable to parse saved cart:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  const addToCart = (product) => {
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/ecommerce/cart`,
        {
          product,
        }
      )
      .then(() => {
        setCartList((prevCart) => [...prevCart, product]);
      })
      .catch((err) => {
        console.error("Unable to add to cart:", err);
      });
  };

  const removeFromCart = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/ecommerce/cart/${id}`
      )
      .then(() => {
        setCartList((prevCart) => prevCart.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error("Unable to remove from cart:", err);
      });
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return "";
    }

    return typeof price === "number" ? currencyFormatter.format(price) : price;
  };

  const renderProducts = () => (
    <>
      <header id="shopping-head">
        <button onClick={() => navigateTo(PAGE_CART)} id="goToCart">
          Go to Cart ({cartList.length})
        </button>
      </header>
      <div id="shopping">
        {isLoading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && products.length === 0 && (
          <p>No products available at the moment.</p>
        )}
        {!isLoading && !error &&
          products.map((product) => (
            <div className="card" key={product.id}>
              <div id="product">
                {product.image_url && (
                  <img src={product.image_url} alt={product.name || "Product"} />
                )}
                <h2> {product.name} </h2>
                <h3> {product.description} </h3>
                <h3> {formatPrice(product.price)} </h3>
                <button onClick={() => addToCart(product)}> Add to Cart </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );

  const renderCart = () => (
    <>
      <div id="cart-container">
        <button onClick={() => navigateTo(PAGE_PRODUCTS)} id="products-btn">
          Back to Products
        </button>

        <h1 id="cart-title"> Cart </h1>

        {cartList.length === 0 && <p>Your cart is empty.</p>}

        {cartList.map((product) => (
          <div className="card card-container" key={product.id}>
            <div id="product">
              {product.image_url && (
                <img src={product.image_url} alt={product.name || "Product"} />
              )}
              <h2> {product.name} </h2>
              <h3> {product.description} </h3>
              <h3> {formatPrice(product.price)} </h3>
              <button onClick={() => removeFromCart(product.id)}>
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="main">
      {page === PAGE_PRODUCTS ? renderProducts() : renderCart()}
      <NavBar length={cartList.length} />
    </div>
  );
};

export default Shopping;
