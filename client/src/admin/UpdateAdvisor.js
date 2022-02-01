import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';
import { isAuth, getCookie} from '../auth/helpers';
const UpdateAdvisor = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        photo:'',
        company:'',
        jobrole:'',
        categories: [],
        category: '',
        gradyear:'',
        branch: '',
        college: '',
        cgpa:'',
        resume:'',
        skill:'',
        bookinglink:'',
        pickupline:"",
        loading: false,
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);

    const {
        name,
        email,
        phone,
        company,
        jobrole,
        category,
        gradyear,
        branch,
        college,
        cgpa,
        skill,
        bookinglink,
        pickupline,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;
    const token = getCookie('token');
    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    email:data.email,
                    company:data.company,
                    jobrole:data.jobrole,
                    gradyear:data.gradyear,
                    branch:data.branch,
                    college:data.college,
                    cgpa:data.cgpa,
                    skill:data.skill,
                    bookinglink:data.bookinglink,
                    pickupline:data.pickupline,
                    phone: data.phone,
                    category: data.category._id,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        if(name==='photo'){
            const value =  event.target.files[0];
            formData.set(name, value);
            setValues({ ...values, [name]: value });
        }
        else if(name==='resume'){
            const value =  event.target.files[0];
            formData.set(name, value);
            setValues({ ...values, [name]: value });
        }
        else{
            const value =   event.target.value;
            formData.set(name, value);
            setValues({ ...values, [name]: value });
        }
      
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduct(match.params.productId, isAuth()._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    phone:'',
                    photo:'',
                    company:'',
                    jobrole:'',
                    gradyear:'',
                    branch: '',
                    college: '',
                    cgpa:'',
                    resume:'',
                    skill:'',
                    bookinglink:'',
                    pickupline:"",
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
                    <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">email</label>
                <input onChange={handleChange('email')} className="form-control" value={email} type="email" />
            </div>

            <div className="form-group">
                <label className="text-muted">Phone No</label>
                <input onChange={handleChange('phone')} className="form-control" value={phone} type="number" />
            </div>

            <div className="form-group">
                <label className="text-muted">company</label>
                <input onChange={handleChange('company')} type="text" className="form-control" value={company} />
            </div>

            <div className="form-group">
                <label className="text-muted">Job Role</label>
                <input onChange={handleChange('jobrole')} type="text" className="form-control" value={jobrole} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Grad Year</label>
                <input onChange={handleChange('gradyear')} className="form-control" value={gradyear} type="number" />
            </div>

            <div className="form-group">
                <label className="text-muted">Branch</label>
                <input onChange={handleChange('branch')} type="text" className="form-control" value={branch} />
            </div>

            <div className="form-group">
                <label className="text-muted">College</label>
                <input onChange={handleChange('college')} type="text" className="form-control" value={college} />
            </div>
             
            <div className="form-group">
                <label className="text-muted">CGPA</label>
                <input onChange={handleChange('cgpa')} className="form-control" value={cgpa} type="number" />
            </div>

            <div className="form-group">
                <label className="text-muted">Domain Skills</label>
                <input onChange={handleChange('skill')} type="text" className="form-control" value={skill} />
            </div>

            <div className="form-group">
                <label className="text-muted">Booking link</label>
                <input onChange={handleChange('bookinglink')} type="text" className="form-control" value={bookinglink} />
            </div>

            <div className="form-group">
                <label className="text-muted">Pickup Line</label>
                <input onChange={handleChange('pickupline')} type="text" className="form-control" value={pickupline} />
            </div>


          
            <h4>Upload Resume</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('resume')} type="file" name="resume" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" />
                </label>
            </div>
            <button className="btn btn-outline-primary">Update Advisor</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        <Layout title="Add a new product" description={`G'day ${isAuth().name}, ready to add a new product?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateAdvisor;