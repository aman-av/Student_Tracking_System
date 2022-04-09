import React,{useState} from 'react'
import { Button ,Row,Col,Container,Form,Table} from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Student() {
    const navigate = useNavigate();

    const [data, setData] = useState([{}])
    const [data2, setData2] = useState([{}])
  const [date, setdate] = useState("")  
  const [username, setusername] = useState(localStorage.getItem("username"))


  const handler1 = async (e) =>{
    e.preventDefault();
    
    console.log({username,date})
    const res = await axios.get('/get-record', {
        headers: {  
          username: username,
          datee:date
        //   date:date
        }
      });
      console.log("data",res.data.hostelarr)
      const dd= await res.data.hostelarr;
      const dd2= await res.data.campusarr;

      setData(dd);
      setData2(dd2);
      console.log("dd",dd)
      console.log("dd2",dd2)

      
  

}

  const handler = () => {
    
      axios({ 
          method: "GET", 
          withCredentials: true, 
          url: "/logout", 
      }).then((res) => { 
          // setLoginUsername("") 
          // setLoginPassword("") 
          navigate(`/login`); 
      }); 


  }

  return (
    <div>
      <Container>
            <h1>Student</h1>
            <h3>
              {username}
            </h3>
        <div style={{textAlign:"right"}}>
              <Button variant="secondary" onClick ={handler}>Logout</Button>

        </div>
      <Row style={{margin: "3% 20% 3% 20%", textAlign: "left"}}>
      
        <Form>
      <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              name="date"
              type="text"
              placeholder="Enter Date DD/MM/YYYY"
              //   value="passwordver"
              
              value={date}
              onChange={e=>{setdate(e.target.value)}}
              />
            </Form.Group>
            <Button variant="secondary" type="submit" onClick={handler1}>
            Submit
          </Button>
          </Form>
          <div style={{textSize:"1.8rem",fontWeight:"bold",textAlign:"center"}}>

Hostel Record
</div>
          {
            data.map((i,index)=>
            <div style={{textAlign:"left"}} key={index}>
              <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Time</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td>{index+1}</td>
      <td >{i.time}</td>
      <td>{i.check}</td>
    </tr>
  </tbody>
</Table>
           
            
            </div>
            )
          }
          <div style={{textSize:"1.8rem",fontWeight:"bold",textAlign:"center"}}>

          Campus Record
          </div>

{
            data2.map((i,index)=>
            <div style={{textAlign:"left"}} key={index}>
              <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Entry Time</th>
      <th>Exit Time</th>
      <th>Subject</th>
      <th>Attended</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td>{index+1}</td>
      <td >{i.in_time}</td>
      <td>{i.out_time}</td>
      <td>{i.subject}</td>
      <td>{i.attended?"Present":"Absent"}</td>
    </tr>
  </tbody>
</Table>
           
            
            </div>
            )
          }
          

      </Row>
      </Container>


    </div>
  )
}

export default Student