import React from "react";
// import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import ProductsPage from "./components/Productspage/ProductsPage";
import Detail from "./components/P-Detail/Detail";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/checkout/Checkout.class";
import { Routes, Route } from "react-router-dom";

import { useCart } from "./cartContext";

export default function App() {
  const { dispatch } = useCart();

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<ProductsPage />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              dispatch={dispatch}
              element={<Checkout />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
