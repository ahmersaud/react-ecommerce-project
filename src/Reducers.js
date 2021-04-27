const cartreducer=(cart,action)=>{
    //whatever a reducer returns becomes the new state(cart state)
    switch(action.type){
        case "empty":
            return [];
        
        case "add":
          {  const {id,sku,price}=action; //destructuring
            const itemInCart = cart.find((i) => i.sku === sku);
            if (itemInCart) {
              return cart.map((i) => {
                if (i.sku === sku) {
                  return { ...i, quantity: i.quantity + 1 };
                } else {
                  return i;
                }
              });
            } else {
              return [...cart, { id, sku, quantity: 1, price }];
            }}
              
        case "updateQuantity":
            {const {sku,quantity}=action; //destructuring
                
                  return cart.map((i) => {
                    if (i.sku === sku) {
                      return { ...i, quantity };
                    } else {
                      return i;
                    }
                  });}

        case "deleteitem":
            {const {sku}=action; //destructuring
            return cart.filter((i) => i.sku !== sku);}
                  
        default:
            throw new Error("unhandled action"+ action.type);    

    }
}
export default cartreducer