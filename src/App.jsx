import React from "react";
// import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import ProductsPage from "./components/Productspage/ProductsPage";
import Detail from "./components/P-Detail/Detail";
import Cart from "./components/Cart/Cart";
import { Routes, Route } from "react-router-dom";

export default function App() {
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
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
