import React from "react";
import "./styling/App.css";
import "./styling/nav.css";
import "./styling/footer.css";
import "./styling/home.css";
import "./styling/shopping.css";
import "./styling/about.css";
import "./styling/account.css";
import "./styling/contact.css";
import "./styling/hero.css";
import "./styling/featured.css";


import About from "./pages/about.js";
import Account from "./pages/account.js";
import Cart from "./pages/cart.js";
import Contact from "./pages/contact.js";
import Shopping from "./pages/shopping.js";
import Home from "./pages/home.js";


import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NavBar } from "./components/index.js";
import { Footer } from "./components/index.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="main">
          <NavBar />
          <Footer />
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shopping" element={<Shopping />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
