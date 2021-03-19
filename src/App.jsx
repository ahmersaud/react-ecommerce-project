import React, { useState } from "react";
// import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import ProductsPage from "./components/Productspage/ProductsPage";
import Detail from "./components/P-Detail/Detail";
import Cart from "./components/Cart/Cart";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [cart, setcart] = useState([]);

  const addtocart = (id, sku) => {
    //in this method we are updating state using existing state so we are using function form of set state
    setcart((items) => {
      //React will provide the current state as the arguement to this function

      //whatever we return inside this function becomes the new state
      //if a product with same sku is added in the cart,then quantity should be incremented
      //the sku is the unique identifier for show/size combo
      //we need to check  if the sku is already in the cart

      const itemInCart = items.find((i) => i.sku === sku);
      //  itemInCart.quantity++;//we should not do this because we trying to avoid mutating
      if (itemInCart) {
        return items.map((i) => {
          if (i.sku === sku) {
            return { ...i, quantity: i.quantity + 1 };
          } else {
            return i;
          }
        });
      } else {
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  };

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<ProductsPage />} />
            <Route
              path="/:category/:id"
              element={<Detail addtocart={addtocart} />}
            />
            <Route path="/cart" element={<Cart cart={cart} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
