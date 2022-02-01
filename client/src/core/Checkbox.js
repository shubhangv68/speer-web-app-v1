import React, {useState,useEffect} from 'react' ;


const Checkbox = ({categories,handleFilters}) => {
    const [checked,setChecked] = useState([])

    const buttoncolorchange=(event)=>{
      
      
        if(event.target.style.backgroundColor=="white"){
            event.target.style.backgroundColor="#6558F5";
            event.target.style.color="white";
        }
        else{
            event.target.style.backgroundColor="white";
            event.target.style.color="#6558F5"
        }
    }

    const handleToggle = c => (event) => {
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]
           buttoncolorchange(event);
        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }
        else{
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        
      //console.log(newCheckedCategoryId);
      setChecked(newCheckedCategoryId);
      handleFilters(newCheckedCategoryId);
    }



    return categories.map((c,i)=>(
       
            <button key={i} onClick={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="button" style={{height:"90%",width:"fit-content",backgroundColor:"white","display":"inline-block", "white-space": "nowrap",marginLeft:"10px",marginTop:"1%", borderRadius:"8px",borderColor:"#6558F5",color:"#6558F5"}}>{c.name}</button>
        
            
    ));
};


export default Checkbox;