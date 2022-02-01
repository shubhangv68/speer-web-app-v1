import React, { useRef } from 'react';
import Layout from './core/Layout';
import { Link, Redirect } from 'react-router-dom';
import homeimg from '../src/Images/home.jpeg';
import './styles.css'
import { Container,Row,Col, Navbar } from 'react-bootstrap';
import axios from 'axios';
import { authenticate, isAuth } from './auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import Google from './auth/Google';
import 'react-toastify/dist/ReactToastify.min.css';
import cookieParser from "cookie-parser";
import './styles.css';
const  App = ({history}) => {
   
  //this.googleref = React.useRef(null);
    
  const routeChange = () =>{ 
    let path = `signin`; 
    history.push(path);
  }
  const routeChangesignup = () =>{ 
    let path = `signup`; 
    history.push(path);
  }
  const informParent = response => {
   
    authenticate(response, () => {
    
        isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/Advisorcards');
    });
};

  return (
    <Layout >
      <Container fluid={true} style={{minHeight:"100vh"}}>
        <Row >
          <Col xs={12} md={6}>
          <h1
           style={{"color":"#6558F5","marginTop":"18%","font-weight":"bold","fontSize":"35px"}}
          >
           BUILD YOUR DREAMS.</h1>

         

          <p style={{"fontSize":"140%","color":"#6558F5","marginTop":"5%"}}>1 ON 1 LIVE SESSIONS</p>
          <p style={{"fontSize":"140%","color":"#6558F5","marginTop":"1%"}}>PROFILE REVIEW</p>
          <p style={{"fontSize":"140%","color":"#6558F5","marginTop":"1%"}}>FOCUSED GUIDANCE</p>
          
        
       
    
          </Col>

          <Col sm={0} md={6}>
          <img id="homeimg" style={{"display":"block","marginTop":"3%","width":"100%","height":"100%"}} src={homeimg} href="logo" />
          </Col>
    
   
    </Row>


  {/* <Row>
    <Col sm={12} md={4}>
    <p style={{"fontSize":"140%","color":"#6558F5","marginTop":"5%","font-weight":"bold"}}>1 ON 1 LIVE SESSIONS</p>
    </Col>
    <Col sm={12} md={4}>
    <p style={{"fontSize":"140%","color":"#6558F5","marginTop":"5%","font-weight":"bold"}}>PROFILE REVIEW</p>
    </Col>
    <Col sm={12} md={4}>
    <p style={{"fontSize":"140%","color":"#6558F5","marginTop":"5%","font-weight":"bold"}}>FOCUSED GUIDANCE</p>
    </Col>
  </Row> */}
 <p style={{"fontSize":"170%","color":"#6558F5","marginTop":"5%","font-weight":"bold",textAlign:"center"}}>JOIN FOR FREE!</p>
 <Row className="text-center">
 <Col sm={12} >
 {!isAuth()&&( <button 
     onClick={routeChange}
                  
                  style={{
                   "backgroundColor":"#6558F5","color":"white","borderRadius":"10px","display":"inline-block", "white-space": "nowrap","minHeight":"fit-content",width:"25%",minWidth:"fit-content",height:"120%"}}
                    >
                       SIGN IN
                    </button>)}
                    </Col>
                    {!isAuth()&&( <hr style={{color:'white'}}></hr>)}
                    <Col sm={12}>

           {!isAuth()&&(
          
                    <button 
     onClick={routeChangesignup}
                  
                  style={{
                   "backgroundColor":"white","color":"#6558F5","borderRadius":"10px","display":"inline-block", "white-space": "nowrap","minHeight":"fit-content",width:"25%",borderColor:"#6558F5",minWidth:"fit-content",height:"120%"}}
                    >
                       SIGN UP
                    </button>)}
                    </Col>
                    </Row> 
    </Container>

    


        {/* <Container fluid={true} style={{marginTop:"-3%"}}>
          <Row>
            <Col xs={12} md={4} style={{height:"75%"}}>
            <img style={{"display":"block","marginTop":"9%","width":"100%","height":"80%"}} src={img1} href="logo" />
            </Col>
            <Col xs={12} md={4}>
            <img style={{"display":"block","marginTop":"3%","width":"100%","height":"80%"}} src={img2} href="logo" />
            </Col>
            <Col xs={12} md={4}>
            <img style={{"display":"block","marginTop":"6%","width":"100%","height":"80%"}} src={img3} href="logo" />
            </Col>
          </Row>
          </Container>  */}
                   
  </Layout>

  );
}

export default App;
