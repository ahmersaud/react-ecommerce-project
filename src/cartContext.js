import React,{useReducer,useEffect,useContext} from 'react';
import cartreducer from "./Reducers";

 const CartContext=React.createContext(null);

 let initialstate;
try {
  //retrieving cart data from local storage
  initialstate = JSON.parse(localStorage.getItem("cart")) ?? []; //?? means if the value on the left is null then return [];
} catch (error) {
  console.log("cannot parse data from the local storage");
  initialstate = [];
}

 export const CartProvider=(props)=>{
    const [cart, dispatch] = useReducer(cartreducer, initialstate);
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
    //the above expression says that anytime the cart changes,  store it in local storage as Json string ,using key 'cart'

    const contextvalues={cart,dispatch};

    return <CartContext.Provider value={contextvalues}>{props.children}</CartContext.Provider>
 }

 //we need to create a custom hook to consume the context in different components
 // there are 3 benefits of doing this
 //1.Easier to consume
 //2.Protects the context
 //3.Can display helpful errors if misused

 export const useCart=()=>{
     const context=useContext(CartContext);
     return context;
 }
//now it is easier to consume: consumer dont have to import the context and pass it to useContext

