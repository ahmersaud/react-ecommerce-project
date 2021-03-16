import React,{useState} from "react";
// import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import ProductsPage from "./components/Productspage/ProductsPage";
import Detail from "./components/P-Detail/Detail";
import Cart from "./components/Cart/Cart";
import { Routes, Route } from "react-router-dom";

export default function App() {

  const [cart,setcart]=useState([]);

  const addtocart=(id,sku)=>{
     setcart((item)=>{  //React will provide the current state as the arguement to this function

     //whatever we return inside this function becomes the new state
     //if a product with same sku is added in the cart,then quantity should be incremented
     //the sku is the unique identifier for show/size combo
     //we need to check  if the sku is already in the cart

     const itemInCart=item.find((i)=>i.sku===sku);
     itemInCart.quantity++;//we should not do this//

     })
  }

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
