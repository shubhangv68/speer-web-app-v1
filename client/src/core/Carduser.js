import React, { useState } from 'react';
import { Link, Redirect,useHistory  } from 'react-router-dom';
import {ShowImage} from './ShowImage';
import Card from 'react-bootstrap/Card'
import { Container,Row,Col } from 'react-bootstrap';
import window from 'global';
import { API } from "../config";
import imageback from  '../Images/speercard.png';
import '../styles.css';
import { isAuth } from '../auth/helpers';
const Carduser = ({
  advisor,showViewProductButton = true
}) => {
  let history = useHistory();

  function viewresume(){
    if(isAuth()){
      window.open(`${API}/advisor/resume/${advisor._id}`);
    }
    else{
     
      history.push('/signin');
    }

  }
  function schedulelink(){
   // !isAuth() ? history.push('/signin') : null;

   if(isAuth()){
    window.open(`${advisor.bookinglink}`);
  }
  else{
   
    history.push('/signin');
  }
   
  }
  const showViewButton = showViewProductButton => {

    return(
      showViewProductButton && (
        <div>
          <button className="btn btn-outline-primary mt-2 mb-2 "  style={{"marginLeft":"2%"}} onClick={viewresume}>
        VIEW RESUME
       </button>
    
        <button className="btn btn-primary mt-2 mb-2  " style={{"marginLeft":"7%"}} onClick={schedulelink} >
        SCHEDULE 
       </button>
       
       
       </div>
       

      )
    );
  };

  return (

<div className="card text-center">
<div className="card-body">
    <ShowImage item ={advisor} url= "advisor" />
    <p style={{"display":"inline-block", "white-space": "nowrap", "fontSize":"20px"}}>{advisor.name}</p>
    <hr style={{marginTop:"-27px",color:"white"}}></hr>
    <p style={{"display":"inline-block", "white-space": "nowrap",font:"10px"}}>{advisor.jobrole} at {advisor.company}</p>
        <hr style={{marginTop:"-27px",color:"white"}}></hr>
        <p style={{"display":"inline-block", "white-space": "nowrap",font:"10px"}}>{advisor.branch},{advisor.college}({advisor.gradyear})</p>
        <hr style={{marginTop:"-10px",color:"white"}}></hr>
        <div className="containerback">
        <img
        src={imageback}
        width="85%"
        height="20%"
        alt="speer logo" />
        <div id="top-left">{advisor.pickupline}</div>
        </div>
        {/* <div style={{"backgroundColor":"#DEE2E6","width":"25%","height":"20%","margin":"auto","borderRadius":"15px"}}></div> */}
    {showViewButton(showViewProductButton)}
</div>
</div>


    



  );
};

export default Carduser;




