
   
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Private from './core/Private';
import Admin from './core/Admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './admin/AddCategory';
import AddAdvisor from './admin/AddAdvisor';
import Advisorcard from './core/Advisorcard';
import Support from './core/Support';
import Forgot from './auth/Forgot';
import Reset from './auth/Reset';
import ManageAdvisor from './admin/ManageAdvisor';
import UpdateAdvisor from './admin/UpdateAdvisor';
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/helpandsupport" exact component={Support} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <PrivateRoute path="/private" exact component={Private} />
                <Route path="/Advisorcards" exact component={Advisorcard} />
                <AdminRoute path="/admin" exact component={Admin} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/advisor/update/:productId" exact component={UpdateAdvisor} />
                <AdminRoute path="/create/advisor" exact component={AddAdvisor} />
                <Route path="/auth/password/forgot" exact component={Forgot} />
                <Route path="/auth/password/reset/:token" exact component={Reset} />
                <AdminRoute path="/admin/Advisor" exact component={ManageAdvisor} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;