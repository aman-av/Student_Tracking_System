import React,{useState,useEffect} from 'react'
import { Button ,Form,Container,Row,Col} from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Daily() {

    const navigate = useNavigate();

    const [page,setPage] = useState("")
    const [time,setTime] = useState("")
    const [username, setUsername] = useState("")
    const [date, setDate] = useState("")
    const [data, setData] = useState("")
    


    
    const handler4 = (e) =>{
        e.preventDefault();
    
        console.log({username,date,time})
        axios.post('/vat', {
        username:username,  
        check:data,
        time:time,
        date:date
       })
       .then(function (response) {
        //  navigate(`${response.data.redirect}`)
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });
    }

    if(data==="in")
    return(<div>
                 </div>)
    else (<div>
       
    </div>)

}

export default Daily