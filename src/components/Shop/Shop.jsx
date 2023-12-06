import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);

    useEffect( ()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    useEffect( ()=>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        //Step 1: get id
        for(const id in storedCart){
    //Step2: get the product from products stated by using id
            const addedProduct = products.find(product =>
                product.id === id)
            //Step 3: add quality of the product
            if(addedProduct){
                const quantity = storedCart[id]
                addedProduct.quantity = quantity
                //step 4: add the added product to the saved cart
                savedCart.push(addedProduct)
            }
        }
        //step 5: set the cart
        setCart(savedCart)
    },[products])

    const handleAddToCart = (product) =>{
        // console.log(product)
        let newCart = [];
    //    const newCart = [...cart,product]
       //if product doesn't exist in the cart, then set quantity = 1
       //if exist update quantity by 1
       const exists = cart.find(pd => pd.id === product.id)
    //    console.log(exists)
       if(!exists){
        console.log("product is not exist: - ",exists)
        product.quantity = 1;
        newCart = [...cart, product]
       }
       else{
       console.log("product is exist: - ")
        exists.quantity = exists.quantity + 1;
        const remaining = cart.filter(pd => pd.id !== product.id);
        newCart = [...remaining, exists];
       }

       setCart(newCart)
       addToDb(product.id)
    }

    const handleClearCart = () =>{
        console.log('clicked clear button')
        setCart([])
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                 {
                    products.map(product => <Product 
                        key={product.id} 
                        product={product}
                        handleAddToCart={handleAddToCart}></Product>)
                 }
            </div>
            <div className="cart-container">
                 <Cart 
                 key={cart.id}
                 cart={cart}
                 handleClearCart={handleClearCart}
                 >
                    <Link className='proceed-link' to='/orders'>
                        <button className='btn-proceed'>Order Review</button>
                    </Link>
                 </Cart>
            </div>
            
        </div>
    );
};

export default Shop;