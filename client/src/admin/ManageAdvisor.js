import React, { useState , useEffect} from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { getProducts,deleteProduct } from "./apiAdmin";
import { isAuth, getCookie} from '../auth/helpers';

const ManageAdvisor = () => {

    const [products, setProducts] = useState([]);

    //const { user, token } = isAuthenticated();

    const token = getCookie('token');

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, isAuth()._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);



    return(
        <Layout  className = "container-fluid">
             
              <div className="jumbotron ">
            <h2 >Manage Advisors</h2>
            <p className="lead">Perform CRUD on Advisors</p>
             </div>
             <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {products.length} Advisors
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.name}</strong>
                                <Link to={`/admin/advisor/update/${p._id}`}>
                                    <span >
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                    className=""
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageAdvisor;