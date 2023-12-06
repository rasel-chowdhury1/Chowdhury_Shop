import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () =>{
     const loaderProducts = await fetch('products.json');
     const products = await loaderProducts.json();
    //  console.log(products);
    //if cart data is in localstorage, you have to use async await
    const storedCart = getShoppingCart()
    // console.log(storedCart)
    const savedCart = []
    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);
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