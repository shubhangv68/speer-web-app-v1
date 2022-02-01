import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { authenticate, isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };
    
    const passwordforgot = ()=>{
        let path = `/auth/password/forgot`; 
        history.push(path);
    }
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }
        })
            .then(response => {
                console.log('SIGNIN SUCCESS', response);
                // save the response (user, token) localstorage/cookie
                authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                    // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                    isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/Advisorcards');
                });
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signinForm = () => (
        <form autocomplete="on">
            <div className="form-group">
                <lable className="text-muted">Email</lable>
                <input onChange={handleChange('email')} value={email} placeholder="enter your email" type="email" className="form-control" />
            </div>

            <div className="form-group">
                <lable className="text-muted">Password</lable>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

            <div className='mt-2'>
                <button className="btn btn-primary"  onClick={clickSubmit}>
                    {buttonText}
                </button>

                <button className="btn btn-outline-primary" style={{marginLeft:"3px"}}  onClick={passwordforgot}>
                    Forgot Password?
                </button>
               
            </div>

            
        </form>
        
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? <Redirect to="/Advisorcards" /> : null}
                <h1 className="m-5 text-center">SIGN IN</h1>
                {signinForm()}
                
               
            </div>
        </Layout>
    );
};

export default Signin;
