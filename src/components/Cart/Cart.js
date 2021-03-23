import React from "react";
import useFetchAll from "../../services/useFetchAll";
import Spinner from "../../Spinner";

export default function Cart({ cart, updateQuantity,deleteitem }) {
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus } = products.find(
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
              onChange={(e) => updateQuantity(sku, parseInt(e.target.value))}
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
          <button onClick={()=>{deleteitem(sku)}}>Remove from cart</button>
        </div>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  if(cart.length===0){
    return<h2>Your cart is empty</h2>
  }

  return (
    <section id="cart">
      <h1>Cart</h1>
      <ul>{cart.map(renderItem)}</ul>
    </section>
  );
}
