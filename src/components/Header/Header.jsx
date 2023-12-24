import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';


const Header = () => {
    const {user,logOut} = useContext(AuthContext);
    // console.log(user,logOut);
    

    return (
        <nav className='header'>
            <img src={logo} alt="logo_image" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to='/register'>Register</Link>
                      
            </div>
            {
                user && <>
                    <p>Welcome {user.email}</p> 
                    <button onClick={logOut}>Logout</button>
                    </>
            } 
        </nav>
    );
};

export default Header;