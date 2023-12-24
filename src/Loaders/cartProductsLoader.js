import { key } from "localforage";
import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () =>{

     const storedCart = getShoppingCart()
    //  console.log(storedCart)
     const orderProductId = Object.keys(storedCart);
     console.log(orderProductId)
     const loaderProducts = await fetch(`http://localhost:3000/productsByIds`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(orderProductId)
     });
     
     

     const products = await loaderProducts.json();
     console.log("hello world")
    //  console.log(products);
    //if cart data is in localstorage, you have to use async await
    
    const savedCart = []
    for(const id in storedCart){
        const addedProduct = products.find(pd => pd._id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct)
        }
    }
    
    // if you need to send two more
    //one way return [products, savedCart]
    //another way return {products, savedCart}

     return savedCart;
}

export default cartProductsLoader;