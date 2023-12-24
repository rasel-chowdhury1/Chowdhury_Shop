import React from 'react';
import './OrderItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const OrderItem = (props) => {
    console.log(props)
    const {_id,img,name,price,quantity} = props.product;
    const {handleDeleteToCart} = props
    return (
        <div className='orderItem'>
            <img src={img} alt="order_image" />
            <div className="order-details">
                <p className='order-title'>{name}</p>
                <p>Price: <span className='orange-text'>${price}</span></p>
                <p>Quantity: <span className='orange-text'>{quantity}</span></p>
            </div>
            <button onClick={()=>handleDeleteToCart(_id)} className='del-button'>
                <FontAwesomeIcon className='del-icon' icon={faTrashAlt} />
            </button>
            
        </div>
    );
};

export default OrderItem;