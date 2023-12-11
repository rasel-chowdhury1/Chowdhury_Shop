import React, { useContext, useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Register = () => {
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');

    const {createUser} = useContext(AuthContext);
    console.log(createUser)

    const handleSignupButton = (event) =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirm = event.target.confirm.value;
        console.log(email,password,confirm)
        setError('');
        setSuccess('');

        if (password.length < 8){
            setError('password is short.please provide maximum 8 characters');
            return;
        }
        else if(password !== confirm){
            setError('password not match with confirm password')
            return;
        }

        createUser(email,password)
        .then(result =>{
            console.log(result.user);
            setSuccess('Successfully create user');
            event.target.reset();
        })
        .catch(error =>{
            console.log(error.message);
            setError(error.message)
        })
    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Sign Up</h1>
            <form onSubmit={handleSignupButton}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder='Your email' required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder='password' required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="confirm" placeholder='confirm password' required/>
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
                <p>Already have an account? <span><Link to='/login'>Login</Link></span></p>
            </form>
            <p className='error'><small>{error}</small></p>
            <p className='success'><small>{success}</small></p>
        </div>
    );
};

export default Register;