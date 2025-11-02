import React from "react";

const Product = ({ product, handleCartAction, isProductInCart}) => {
  if (!product) {
    return null;
  }

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

  return (
    <div className="card">
      <div id="product">
        {product.image_url && (
          <img src={product.image_url} alt={product.name || "Product"} />
        )}
        <h2>{product.name}</h2>
        <h3>{product.description}</h3>
        <h3>{formatPrice(product.price)}</h3>
        <button onClick={() => handleCartAction(product)}> { isProductInCart(product.id) ? "Remove from Cart" : "Add to Cart"} </button>
      </div>
    </div>
  );
};

export default Product;
