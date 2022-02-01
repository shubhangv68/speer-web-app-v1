import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Container,Row,Col } from 'react-bootstrap';

const Admin = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE', response);
                const { role, name, email } = response.data;
                setValues({ ...values, role, name, email });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
              
                    signout(() => {
                        history.push('/');
                    });
                
            });
    };

    const { role, name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/update/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('Profile updated successfully');
                });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const adminLinks = () => {
        return (
            <div className="card ">
                <h4 className="card-header ">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/advisor">
                            Create Advisor
                        </Link>
                    </li>

                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/Advisor">
                            Manage Advisors
                        </Link>
                    </li>
                  
                </ul>
            </div>
        );
    };

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted mt-3">Role</label>
                <input defaultValue={role} type="text" className="form-control " disabled />
            </div>
            <div className="form-group">
                <label className="text-muted mt-3">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control " />
            </div>

            <div className="form-group">
                <label className="text-muted mt-3">Email</label>
                <input defaultValue={email} type="email" className="form-control " disabled />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

            <div>
                <button className="btn btn-primary mt-3" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <Row>
            <div className="row mt-5">
                <ToastContainer />
                <Col xs={12} md={4}>
                <div >{adminLinks()}</div>
                </Col>
                <Col xs={12} md={8}>
                <div >{updateForm()}</div>
                </Col>
              
            </div>
            </Row>
        </Layout>
    );
};

export default Admin;
