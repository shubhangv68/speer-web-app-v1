import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Carduser';
import {getCategories,getFilteredProducts} from './apiCore';
import Checkbox from './Checkbox';
import { Container,Row,Col } from 'react-bootstrap';





const Advisorcard = () => {
    const [myFilters, setMyFilters] = useState({
        filters:{category: [], rating:[]}
    });
    const [categories,setcategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectsector,setselectsector] = useState(false);

    const handleslectsector=()=>{
       
        if(!selectsector){
          
            setselectsector(true);
        
            
        }
        else{
         
            setselectsector(false);
            
        
        }
    }

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
               setcategories(data)
            }
                
        });
    };
    const loadFilteredResults = newFilters => {
       // console.log(newFilters);
       getFilteredProducts(skip,limit,newFilters).then(data => {
           if(data.error){
               setError(data.error);
               setSkip(skip+6);
               console.log("6666666");
               console.log(skip);
               
           }else{
               setFilteredResults(data.data);
               setSize(data.size)
               setSkip(0)

           }
       });
    };

    const loadMore = () => {
        let toSkip = skip + limit
        console.log("11111111");
        console.log(toSkip);
        getFilteredProducts(toSkip,limit,myFilters.filters).then(data => {
            if(data.error){
                setError(data.error);
            }else{
                setFilteredResults([...filteredResults,...data.data]);
                setSize(data.size)
                setSkip(0);
                setSkip(skip+6);
                console.log("6666666");
                console.log(skip);
 
            }
        });
     };

     const LoadMoreButton = () => {
         return(
             size > 0 && size >= limit && (
             <button onClick={loadMore} className ="btn btn-warning mb-5" >Load more</button>
             )
         )
     }


    useEffect(() => {
        console.log("33333333")
        init();
        loadFilteredResults(skip,limit,myFilters.filters);
    }, []);

    const handleFilters = (filters,filterBy) => {
       //console.log("ngo",filters,filterBy);
       const newFilters = {...myFilters}
       newFilters.filters[filterBy] = filters;
      
       loadFilteredResults(myFilters.filters);
       setMyFilters(newFilters);
    };
    
   

   
    return ( <Layout
        >
            <Container  className="mt-3">
                <Row>
                <h2  style={{textAlign:"center",fontSize:"250%"}}>ADVISORS</h2>
                <hr></hr>
                </Row>
                <Row>
                <button onClick={handleslectsector} className="dropbtn" style={{color:"white","backgroundColor":'#3A51BB',height:"fit-content",width:"fit-content",borderRadius:"5px",boxShadow:"none",borderColor:"transparent",fontSize:"150%"}}>
                    Select Sector</button>
             {selectsector&&(  <>
                   
                   <ul style={{height:"fit-content"}}>
                       <Checkbox categories={categories}
                        handleFilters = {filters => 
                        handleFilters(filters,"category")} />
                   </ul>
                   </>
                )}
                </Row>
             
            
                <Row>
                <Col xs={12} style={{marginTop:"2%"}} >
                  
                   <div className="row"  >
                      {filteredResults.map((advisor,i) => (
                          <div key={i}  className="col-md-6 col-lg-4 mb-3">
                               <Card advisor={advisor}/>
                          </div>

                      ))}
                   </div>
                   <hr/>
                   {LoadMoreButton()}
                </Col>
                </Row>

                </Container>
            
        </Layout>)
}

export default Advisorcard;