import React from 'react';
import './Cart.css';

const Cart = (props) => {
    console.log(props)
    let totalPrice = 0;
    let totalShipping = 0;
    for (const product of props.cart){
        totalPrice += product.price;
        totalShipping += product.shipping;
    }
    const tax = totalPrice*5/100;
    const grandTotal = totalPrice + totalShipping + tax;

    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {props.cart.length}</p>
            <p>Total Price: {totalPrice}</p>
            <p>Total Shipping: {totalShipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h6>Grand Total: {grandTotal.toFixed(2)}</h6>
        </div>
    );
};

export default Cart;