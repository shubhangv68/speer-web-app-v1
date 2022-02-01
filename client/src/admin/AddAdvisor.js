import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie} from '../auth/helpers';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddAdvisor = () => {
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
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const token = getCookie('token');
    const {
        name,
        email,
        phone,
        company,
        jobrole,
        categories,
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

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
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

        createProduct(isAuth()._id, token, formData).then(data => {
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



            <button className="btn btn-outline-primary">Create Advisor</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add Advisor details" description={`G'day ${isAuth().name}, ready to add Advisor details?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddAdvisor;