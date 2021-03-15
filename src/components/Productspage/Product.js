import React from 'react'
import {Link,useParams} from 'react-router-dom';



const Product=(p)=> {
  const {category}=useParams();
    return (
      <div   key={p.id} className="product">
        <Link to={`/${category}/${p.id}`} >
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }
  export default Product;