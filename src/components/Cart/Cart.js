import React from "react";
import useFetchAll from "../../services/useFetchAll";
import Spinner from "../../Spinner";
import {useNavigate} from 'react-router-dom';

export default function Cart(props) {

  const navigate=useNavigate();

  const urls = props.cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  function renderItem(itemInCart) {
    const { id, sku, quantity,price } = itemInCart;
    const {  name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    );
    const { size } = skus.find((s) => s.sku === sku);

    

    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) => props.dispatch({type:"updateQuantity",sku, quantity:parseInt(e.target.value)})}
              value={quantity}
            >
              <option value="0" >Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
          <button onClick={()=>{props.dispatch({type:"deleteitem",sku})}}>Remove from cart</button>
        </div>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  // if(cart.length===0){
  //   return<h2>Your cart is empty</h2>
  // }

  const numofItemsincart=props.cart.reduce((total,item)=>total + item.quantity ,0);
  const totalcost=props.cart.reduce(( total, item ) => total+ item.quantity * item.price ,0);

  return (
    <section id="cart">
      <h1>Cart</h1>
      <h2>{numofItemsincart===0
          ?"Your Cart is Empty"
          :`${numofItemsincart} items in cart`}</h2>
      <ul>{props.cart.map(renderItem)}</ul>
      <h2>{`Total cost: ${totalcost}$`}</h2>
      {props.cart.length>0 && <button className="btn btn-primary" onClick={()=>{navigate("/checkout")}} > Checkout</button>}
    </section>
  );
}
