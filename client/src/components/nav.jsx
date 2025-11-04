import React from "react";
import acct from "../images/acct.png";
import logo from "../images/logo.png";
import cartlogo from "../images/cartlogo.png";
import { Link } from "react-router-dom";

const NavBar = ({ searchTerm = "", setSearchTerm, ...props }) => {
  const cartItemCount = props.length ?? 0;
  return (
    <>
      <div className="nav">
        <div className="nav-items">
          <img className="icons" id= 'logo'src={logo} alt=""></img>
          <input
            type="text"
            className="search-box"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button className="search-btn">search</button>

          <img className="icons" src={acct} alt=""></img>

          <Link to="/cart" id="cart-btn">
            <img src={cartlogo} alt="Cart"></img>
            {cartItemCount > 0 && (
              <span className="cart-count-badge">{cartItemCount}</span>
            )}
          </Link>
        </div>
        <div id="links">
          <Link className="navlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/shopping">
            Shopping
          </Link>
          <Link className="navlink" to="/about">
            About Us
          </Link>
          <Link className="navlink" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;

