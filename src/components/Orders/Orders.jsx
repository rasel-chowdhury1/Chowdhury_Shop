import React, { useState } from 'react';
import './Orders.css';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import OrderItem from '../OrderItem/OrderItem';
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData()
    const [cart,setCart] = useState(savedCart)
    // console.log(savedCart)
    const handleDeleteToCart = (id) =>{
        const remain = cart.filter( pd => pd.id !== id);
        setCart(remain);
        removeFromDb(id)
    }

    return (
        <div className='shop-container'>
            <div className=''>
               <h3>This is order page {cart.length}</h3>
               <div className='orders'>
                {
                    cart.map(product => <OrderItem
                     key = {product.id}
                     product = {product}
                     handleDeleteToCart={handleDeleteToCart}
                    ></OrderItem>)
                }
               </div>
            </div>
            <div className="cart-container">
                 <Cart key={cart.id} cart={cart} ></Cart>
            </div>
            
        </div>
    );
};

export default Orders;