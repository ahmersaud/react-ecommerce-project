import React, { useEffect, useState } from "react";
// import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import ProductsPage from "./components/Productspage/ProductsPage";
import Detail from "./components/P-Detail/Detail";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/checkout/Checkout";
import { Routes, Route } from "react-router-dom";

export default function App() {
  //storing and retrieving cart data from local storage
  const [cart, setcart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? []; //?? means if the value on the left is null then return [];
    } catch (error) {
      console.log("cannot parse data from the local storage");
      return [];
    }
  }); //using a function to initializa the state because the function will only be run once the component renderss for first time and not on every render

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  //the above expression says that anytime the cart changes,  store it in local storage as Json string ,using key 'cart'

  const addtocart = (id, sku, price) => {
    //in this method we are updating state using existing state so we are using function form of set state
    setcart((items) => {
      //React will provide the current state as the arguement to this function

      //whatever we return inside this function becomes the new state
      //if a product with same sku is added in the cart,then quantity should be incremented
      //the sku is the unique identifier for show/size combo
      //we need to check  if the sku is already in the cart

      const itemInCart = items.find((i) => i.sku === sku);

      if (itemInCart) {
        return items.map((i) => {
          if (i.sku === sku) {
            return { ...i, quantity: i.quantity + 1 };
          } else {
            return i;
          }
        });
      } else {
        return [...items, { id, sku, quantity: 1, price }];
      }
    });
  };

  const updateQuantity = (sku, quantity) => {
    setcart((items) => {
      return items.map((i) => {
        if (i.sku === sku) {
          return { ...i, quantity };
        } else {
          return i;
        }
      });
    });
  };

  const deleteitem = (sku) => {
    setcart((items) => {
      return items.filter((i) => i.sku !== sku);
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
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  updateQuantity={updateQuantity}
                  deleteitem={deleteitem}
                />
              }
            />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
