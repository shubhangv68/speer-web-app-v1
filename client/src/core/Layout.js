import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout,authenticate } from '../auth/helpers';
import './layout.css';
import logo from '../Images/speerlogo4.png';
import document from 'global';
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap'; 
import Googlecopy from '../auth/Googlecopy';

const Layout = ({ children, match, history}) => {

    // const textampersand = "HELP&SUPPORT";

    const informParent = response => {
        console.log("hi charan 1");
        authenticate(response, () => {
          console.log("hi charan");
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/Advisorcards');
        });
    };
    
    const nav = () => (
     

<>
    <Navbar  bg='light' expand='md' >
        <Container>
        <Navbar.Brand href="/"><img
        src={logo}
        width="150"
        height="60"
        
        alt="speer logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'  />
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className="justify-content-end" style={{ width: "100%" }} >

            <Nav.Link  className="nav-link"  style={{"fontSize":"110%","color":"#6558F5","display":"inline-block", "white-space": "nowrap"}} href='/Advisorcards'> ADVISORS</Nav.Link>    
            {!isAuth()&&(
      <Nav.Link className="nav-link"  style={{"fontSize":"110%","color":"#6558F5","display":"inline-block", "white-space": "nowrap" ,"marginRight":"-5px"}} href='/signin'>SIGN IN </Nav.Link>
           )}


           
            <Nav.Link className="nav-link"  style={{"fontSize":"110%","color":"#6558F5","display":"inline-block", "white-space": "nowrap"}} href='/helpandsupport'>HELP </Nav.Link>
                 
{!isAuth()&&(
    <Nav.Link href='/signup' style={{"backgroundColor":"#6558F5","color":"white","borderRadius":"10px","display":"inline-block", "white-space": "nowrap","height":"45px","marginLeft":"5px"}}>
           
                         JOIN FOR FREE
                 
  
                    </Nav.Link>
           )}


            {isAuth() && isAuth().role === 'admin' && (
               
                <Nav.Link  className="nav-link"  style={{"fontSize":"110%","color":"#6558F5","display":"inline-block", "white-space": "nowrap"}} href='/admin'> PROFILE </Nav.Link>
                
            )}



               
       
            

            {isAuth() && isAuth().role === 'subscriber' && (
               
               <Nav.Link  className="nav-link"  style={{"fontSize":"110%","color":"#6558F5","display":"inline-block", "white-space": "nowrap"}} href='/private'> PROFILE</Nav.Link>
            )}

            {isAuth() && (
               <Nav.Link style={{"fontSize":"110%","color":"#6558F5","display":"inline-block", "white-space": "nowrap","cursor": 'pointer'}} 
               onClick={() => {
                   signout(() => {
                       history.push('/');
                   });
               }}
           > SIGN OUT
            </Nav.Link>
                 )}

            </Nav>
           </Navbar.Collapse>
        </Container>
    </Navbar>
</>
    );

    return (
        <Fragment>
            {nav()}
            <div className="container">{children}</div>
        </Fragment>
    );
};

export default withRouter(Layout);
