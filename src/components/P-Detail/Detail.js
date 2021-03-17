import React, { useState } from "react";
import Spinner from "../../Spinner";
import useFetch from "../../services/useFetch";
import {useParams,useNavigate} from 'react-router-dom';
import PageNotFound from "../404/PageNotFound"

export default function Detail(props) {
  const {id}=useParams();
  const navigate=useNavigate();

  const [sku,setsku]=useState("");

  const {data:product, loading, error} =useFetch(`products/${id}`);

  if(loading){
    return <Spinner/>;
  }

  if(product.length===0){
    return <PageNotFound/>;
    }
  
  if(error){
    throw error;
  }


  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <select
              id="size"
              value={sku}
              onChange={(e) => {
                setsku(e.target.value);
              }}
            >
              <option value="">what size?</option>
              {product.skus.map((s)=> <option id="size" key={s.sku} value={s.sku}> {s.size}</option>
              )}
            </select> <br/>
            
      <button  disabled={!sku} className="btn btn-primary"  onClick={()=>{
        props.addtocart(id,sku);
        navigate("/cart")}}>Add to cart</button>
      <p id="price">${product.price}</p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}