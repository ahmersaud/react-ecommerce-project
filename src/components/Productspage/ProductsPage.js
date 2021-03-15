import React, { useState } from "react";
import "../../App.css";
import Spinner from "../../Spinner";
import useFetch from "../../services/useFetch";
import ProductList from "./ProductsList";
import { useParams } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";

export default function ProductsPage() {
  const [size, setSize] = useState("");

  const {category}=useParams();

  const { data: products, error, loading } = useFetch(
    "products?category="+category
  );

  // function renderProduct(p) {
  //   return (
  //     <div key={p.id} className="product">
  //       <a href="/">
  //         <img src={`/images/${p.image}`} alt={p.name} />
  //         <h3>{p.name}</h3>
  //         <p>${p.price}</p>
  //       </a>
  //     </div>
  //   );
  // }
  //filter accepts a funtion that returns a boolean and filter returns an array based on that boolean

  const filteredproducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  //the above filteredproducts can also be calculated as the following
  // let filtproducts = [];

  // if (size) {
  //   filtproducts = products.filter((p) =>
  //     p.skus.find((s) => s.size === parseInt(size))
  //   );
  // } else {
  //   filtproducts = products;
  // }

  if (error) {
    throw error;
  } // if error is caught , throwing it to error boundary before rendering

  if (loading) {
    return <Spinner />;
  }

  if(products.length===0){
    return <PageNotFound/>;
  }

  return (
    <>
      
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select
              id="size"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            {size && <h2>Found {filteredproducts.length} items</h2>}
          </section>
          <section id="products">
            {" "}
            <ProductList products={filteredproducts} />{" "}
          </section>
        </>
      
  );
}
