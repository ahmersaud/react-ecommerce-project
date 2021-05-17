import React from "react";
// import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import ProductsPage from "./components/Productspage/ProductsPage";
import Detail from "./components/P-Detail/Detail";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/checkout/Checkout";
import { Routes, Route } from "react-router-dom";
import { CartContext, CartProvider } from "./cartContext";

export default function App() {
  //implemented the below functions through useReducer
  // const addtocart = (id, sku, price) => {
  //   //in this method we are updating state using existing state so we are using function form of set state
  //   setcart((items) => {
  //     //React will provide the current state as the arguement to this function

  //     //whatever we return inside this function becomes the new state
  //     //if a product with same sku is added in the cart,then quantity should be incremented
  //     //the sku is the unique identifier for show/size combo
  //     //we need to check  if the sku is already in the cart

  //     const itemInCart = items.find((i) => i.sku === sku);

  //     if (itemInCart) {
  //       return items.map((i) => {
  //         if (i.sku === sku) {
  //           return { ...i, quantity: i.quantity + 1 };
  //         } else {
  //           return i;
  //         }
  //       });
  //     } else {
  //       return [...items, { id, sku, quantity: 1, price }];
  //     }
  //   });
  // };

  // const updateQuantity = (sku, quantity) => {
  //   setcart((items) => {
  //     return items.map((i) => {
  //       if (i.sku === sku) {
  //         return { ...i, quantity };
  //       } else {
  //         return i;
  //       }
  //     });
  //   });
  // };

  // const deleteitem = (sku) => {
  //   setcart((items) => {
  //     return items.filter((i) => i.sku !== sku);
  //   });
  // };

  // const emptyCart = () => {
  //   setcart([]);
  // };

  return (
    <CartProvider>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<ProductsPage />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </CartProvider>
  );
}
