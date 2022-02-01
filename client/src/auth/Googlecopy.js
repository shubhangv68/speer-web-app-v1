import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Googlecopy = ({ informParent = f => f }) => {

    const responseGoogle = response => {
        console.log(response.tokenId);
       
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data: { idToken: response.tokenId }
        })
            .then(response => {
                console.log('GOOGLE SIGNIN SUCCESS', response);
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            });
    };
    return (
        <div className="pb-3">
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        
                        style={{"backgroundColor":"#6558F5","color":"white","borderRadius":"10px","display":"inline-block", "white-space": "nowrap","height":"45px","marginLeft":"5px"}}>
                         JOIN FOR FREE
                    </button>
                )}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Googlecopy;