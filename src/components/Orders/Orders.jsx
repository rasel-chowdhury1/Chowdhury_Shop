import React, { useState } from 'react';
import './Orders.css';
import Cart from '../Cart/Cart';
import { useLoaderData, Link } from 'react-router-dom';
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

    const handleClearCart = () =>{
        console.log('clicked clear button')
        setCart([])
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className='order-list'>
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
                 <Cart 
                 key={cart.id} 
                 cart={cart}
                 handleClearCart={handleClearCart}
                 >
                    <Link className='proceed-link' to='/checkout'>
                        <button className='btn-proceed'>Proceed Checkout</button>
                    </Link>
                 </Cart>
            </div>
            
        </div>
    );
};

export default Orders;