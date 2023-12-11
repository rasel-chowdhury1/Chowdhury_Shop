import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [error,setError] = useState('');
    const {logIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const from = location.state?.from?.pathname || '/'


   const handleLoginSubmit = (event) =>{
       event.preventDefault();
       const email = event.target.email.value;
       const password = event.target.password.value;
       console.log(email,password)
       setError('');

       logIn(email,password)
       .then(result =>{
          console.log(result.user);
          alert('Successfully Login');
          event.target.reset();
          navigate(from, {replace:true});
       })
       .catch(error =>{
        console.log(error.message);
        setError(error.message);
       })
   }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Login Now!</h1>
            <form onSubmit={handleLoginSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder='Your email' required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={showPassword ? 'text':'password'} name="password" placeholder='Your password' required/>
                    <p onClick={()=>setShowPassword(!showPassword)}><small>{showPassword ? 'hide password':'show password'}</small></p>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
                <p>New to Chowdhury Shop? <span><Link to='/register'>Create New Account</Link></span></p>
            </form>
            <p className='error'><small>{error}</small></p>
        </div>
    );
};

export default Login;