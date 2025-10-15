import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/nav";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const Shopping = () => {
  const [cartList, setCartList] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const addToCart = (product) => {
    setCartList([...cartList, product]);
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
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
          products.map((product, idx) => (
            <div className="card" key={idx}>
              <div id="product">
                {product.image && <img src={product.image} alt="" />}
                <h2> {product.name} </h2>
                <h3> {product.description} </h3>
                <h3> {product.price} </h3>
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

        {cartList.map((product, idx) => (
          <div className="card card-container" key={idx}>
            <div id="product">
              <img src={product.image} alt="" />
              <h2> {product.name} </h2>
              <h3> {product.description} </h3>
              <h3> {product.price} </h3>
            </div>
          </div>
        ))}
        <button id="checkout-btn">Checkout</button>
      </div>
    </>
  );

  return (
    <div className="main">
      {renderProducts()}
      {page === PAGE_CART && renderCart()}
      <NavBar length={cartList.length} />
    </div>
  );
};

export default Shopping;
