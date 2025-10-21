import React from "react";
import productImg from '../images/productImg.png';

const Featured = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/ecommerce/products`)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setProducts(list.slice(0, 5));
      })
      .catch(() => setProducts([]));
  }, []);

const Featured = () => {
  return (
    <>
      <div id="gallery-head">
        <h1> Gallery </h1>
      </div>
      <div id="card-container">
      <div class="featured-card">
          <img
            className="img"
            src={productImg}
            alt=""
          />
          <h3>Add a product here</h3>
        </div>

        <div class="featured-card">
          <img
            className="img"
            src={productImg}
            alt=""
          />
          <h3>Add a product here</h3>
        </div>

        <div class="featured-card">
          <img
            className="img"
            src={productImg}
            alt=""
          />
          <h3>Add a product here</h3>
        </div>

        <div class="featured-card">
          <img
            className="img"
            src={productImg}
            alt=""
          />
          <h3>Add a product here</h3>
        </div>

        <div class="featured-card">
          <img
            className="img"
            src={productImg}
            alt=""
          />
          <h3>Add a product here</h3>
        </div>
      </div>
    </>
  );
};

export default Featured;
