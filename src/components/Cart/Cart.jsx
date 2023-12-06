import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { deleteShoppingCart } from '../../utilities/fakedb';

const Cart = (props) => {
    const {cart} = props
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    
    const {handleClearCart} = props

    // console.log(cart)
    for (const product of cart){
        //approch 1
        // if(product.quantity === 0){
        //     product.quantity = 1;
        // }
        //approch 2
        // product.quantity = product.quantity || 1;
        // console.log(product)
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity
    }
    const tax = totalPrice*5/100;
    const grandTotal = totalPrice + totalShipping + tax;


    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: {totalPrice}</p>
            <p>Total Shipping: {totalShipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h4>Grand Total: {grandTotal.toFixed(2)}</h4>
            <button onClick={handleClearCart} className='btn-clear-cart'>
                <span>Clear Cart</span>
                <FontAwesomeIcon  icon={faTrashAlt} />
            </button>
            {props.children}
        </div>
    );
};

export default Cart;