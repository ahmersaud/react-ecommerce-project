import Product from './Product'
import '../../App.css'
import React from 'react';
const ProductList=({products})=>{
    const ProductArray=products.map((product)=>{
        return (<Product   key ={product.id } id={product.id} name={product.name} image={product.image} price={product.price}  />); //adding key because reacts wants to keep track of components

    });

    return(
        <div id ="products">
              {ProductArray}
        </div>
    );

}
export default ProductList;