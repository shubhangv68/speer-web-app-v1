import React from 'react';
import Layout from '../core/Layout';
import './layout.css';
import logo from './support.png';
import { Container,Row,Col } from 'react-bootstrap';

const Support = () => {
    
  
    return ( <Layout
        >

<Container fluid={true}>
        <Row>
          <Col xs={12} md={6}>
          <h1 
           style={{"color":"#6558F5","marginTop":"8%","font-weight":"bold","fontSize":"30px"}}
          >
           IN CASE OF ANY QUERIES</h1>

          <p style={{"fontSize":"140%","marginTop":"5%"}}>Email : assist@speer.in </p>
          <p style={{"fontSize":"140%","marginTop":"-1%"}}>For tech related queries contact  9618984265 </p>
          <p style={{"fontSize":"140%","marginTop":"-1%"}}>For general queries  9381205219, 7893762346</p>

          </Col>
      
          <h1 
           style={{"color":"#6558F5","marginTop":"1%","font-weight":"bold","fontSize":"30px"}}
          >
           GUIDE TO BOOKING SESSIONS IN SPEER</h1>
         
    </Row>
  
    
  
    </Container>

      <img
        src={logo}
        width="80%"
        height="100%"
        
        alt="speer logo" />
          
        </Layout>)
}

export default Support;