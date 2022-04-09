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

    const handler2 = (e) =>{
        e.preventDefault();
  
        console.log({username,date,time})
        axios.post('/hat', {
        username:username,  
        check:data,
        time:time,
        date:date
       })
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });
    }

    if(data==="in")
    return(<div>
                <Form>
            <Form.Group className="mb-3" controlId="username">
            <Form.Label>Entry Time</Form.Label>
            <Form.Control
              name="intime"
              type="text"
              placeholder="HH:MM Time Format 24hrs"
              value={time}
              
              onChange={e=>{ setTime(e.target.value)}}
              />
            </Form.Group>
            </Form>
            <Button variant="primary" type="submit" onClick={handler2}>
            Add
          </Button>
    </div>)
    else (<div>
        <Form >
            <Form.Group className="mb-3" controlId="username">
            <Form.Label>Exit Time</Form.Label>
            <Form.Control
              name="outtime"
              type="text"
              placeholder="HH:MM Time Format 24hrs"
              value={time}
              
              onChange={e=>{ setTime(e.target.value)}}
              />
            </Form.Group>
            </Form>
            <Button variant="primary" type="submit" onClick={handler2}>
            Add
          </Button>
    </div>)

}

export default Daily