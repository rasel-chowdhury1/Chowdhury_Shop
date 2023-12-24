import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemPerPage] = useState(10);
    // console.log(cart)
    const {totalProducts} = useLoaderData();

    //const itemsPerPage = 10; //TODO: make it dynamic
    const totalPages = Math.ceil(totalProducts/itemsPerPage)
    
    //One way
    // const pageNumbers = [];
    // for(let i=1; i<=totalPages; i++){
    //     pageNumbers.push(i);
    // }

    //second way
    const pageNumbers = [...Array(totalPages).keys()]
    

    /**
     * Done: 1. Determine the total number of items
     * TODO: 2. Decide on the number of items per page
     * Done: 3. Calculate the total number of pages
     * Done: 4. Detarmind the current page
     * 
     * 
     */

    // useEffect( ()=>{
    //     fetch('http://localhost:3000/products')
    //     .then(res => res.json())
    //     .then(data => setProducts(data))
    // },[])

    useEffect( ()=>{
        async function fetchData() {
            const response = await fetch(`http://localhost:3000/products?page=${currentPage}&limit=${itemsPerPage}`)

            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    },[currentPage,itemsPerPage])

    useEffect( ()=>{
        const storedCart = getShoppingCart();
        console.log(storedCart);
        const orderProductId = Object.keys(storedCart);
        console.log(orderProductId)
        

        fetch(`http://localhost:3000/productsByIds`, {
            method: "POST",
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(orderProductId)
        })
        .then(res => res.json())
        .then(cartItems =>{
            const savedCart = [];
            //Step 1: get id
            for(const id in storedCart){
            //Step2: get the product from products stated by using id
                const addedProduct = cartItems.find(cartItem =>
                    cartItem._id === id)
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
        })
        
    },[])

    const handleAddToCart = (product) =>{
        console.log(product)
        let newCart = [];
    //    const newCart = [...cart,product]
       //if product doesn't exist in the cart, then set quantity = 1
       //if exist update quantity by 1
       const exists = cart.find(pd => pd._id === product._id)
    //    console.log(exists)
       if(!exists){
        console.log("product is not exist: - ",exists)
        product.quantity = 1;
        newCart = [...cart, product]
       }
       else{
       console.log("product is exist: - ")
        exists.quantity = exists.quantity + 1;
        const remaining = cart.filter(pd => pd._id !== product._id);
        newCart = [...remaining, exists];
       }

       setCart(newCart)
       addToDb(product._id)
    }

    const handleClearCart = () =>{
        console.log('clicked clear button')
        setCart([])
        deleteShoppingCart()
    }

    const options = [5,10,20];
    function handleSelectChange(event) {
        console.log(event.target.value)
        setItemPerPage(parseInt(event.target.value))
        setCurrentPage(0);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                 {
                    products.map(product => <Product 
                        key={product._id} 
                        product={product}
                        handleAddToCart={handleAddToCart}></Product>)
                 }
            </div>
            <div className="cart-container">
                 <Cart 
                 key={cart._id}
                 cart={cart}
                 handleClearCart={handleClearCart}
                 >
                    <Link className='proceed-link' to='/orders'>
                        <button className='btn-proceed'>Order Review</button>
                    </Link>
                 </Cart>
            </div>

            <div className="pagination">
                <p>Current Page: {currentPage} and Item per page : {itemsPerPage}</p>
                {
                    pageNumbers.map(number => 
                    <button key={number}
                    onClick={() => setCurrentPage(number)}
                    >{number}</button>)
                }

                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
            
        </div>
    );
};

export default Shop;