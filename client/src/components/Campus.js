import React,{useState} from 'react'
import { Container,Row,Col,Button,Modal,Form} from 'react-bootstrap'
import validator from 'validator'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Campus() {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) =>{
    console.log("dsf")
    e.preventDefault();
    console.log({username,password})
   
    axios.post('/createStudent', {
    username:username,
    password:password,

   })
   .then(function (response) {
     console.log(response);
   })
   .catch(function (error) {
     console.log(error);
   });
}

const handler = (e) =>{
    e.preventDefault();
    console.log({username2,date,intime,outtime,subject,attended})
  
    const timeee=intime+outtime;
    let timee=timeee.split(':')
    let time=timee.join('')
    console.log(time)
    axios.post('./cat', {
    username:username2,
    date:date,
    time:time,
    subject:subject,
    attended:attended
   })
   .then(function (response) {
     console.log(response);
   })
   .catch(function (error) {
     console.log(error);
   });
   window.location.reload(true)

}

const navigate = useNavigate();

  

  const handlelogout = () => {
    
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

  const [username, setUsername] = useState("")
  const [username2, setUsername2] = useState("")
  const [password, setPassword] = useState("")
  const [date, setDate] = useState("")
  const [intime, setInTime] = useState("")
  const [outtime, setOutTime] = useState("")
  const [attended, setAttended] = useState(false)
  const [subject, setSubject] = useState("")


  return (
    <div>
        <Container>
          <h1>Campus</h1>
          <div style={{textAlign:"right",marginTop:"0%"}}>
            
      <Button variant="secondary" onClick ={handlelogout}>Logout</Button>
          </div>

            <Row style={{margin:"2% 25% 5% 25%"}}>
            <Button variant="secondary" onClick={handleShow}>
        Add Student
      </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>New Student</Modal.Title>  
                </Modal.Header>
                <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"   
              type="text"
              placeholder="Enter Username"
              value={username}

              onChange={e=>{
              setUsername(e.target.value)}}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="text"
              placeholder="Enter Password"
            //   value="passwordver"
            
              value={password}
              onChange={e=>{setPassword(e.target.value)}}
            />
            </Form.Group>
            </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="secondary" onClick={e=>{handleClose(e);handleSubmit(e)}}>
                    Add
                </Button>
                </Modal.Footer>
            </Modal>


            </Row>
            <Row style={{margin: "3% 20% 3% 20%", textAlign: "left"}}>
            <Form>
            <Form.Group className="mb-3" controlId="username2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username2"
              type="text"
              placeholder="Enter Username"
              value={username2}

              onChange={e=>{
                           setUsername2(e.target.value)}}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              name="date"
              type="text"
              placeholder="DD/MM/YYYY"
            //   value="passwordver"
            
              value={date}
              onChange={e=>{setDate(e.target.value)}}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="intime">
            <Form.Label>Class Entry Time</Form.Label>
            <Form.Control
              name="intime"
              type="text"
              placeholder="HH:MM 24 hour format"
            //   value="passwordver"
            
              value={intime}
              onChange={e=>{setInTime(e.target.value)}}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="outtime">
            <Form.Label>Class Exit Time</Form.Label>
            <Form.Control
              name="outtime"
              type="text"
              placeholder="HH:MM 24 hour format"
            //   value="passwordver"
            
              value={outtime}
              onChange={e=>{setOutTime(e.target.value)}}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              name="subject"
              type="text"
              placeholder="Subject"
            //   value="passwordver"
            
              value={subject}
              onChange={e=>{setSubject(e.target.value)}}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="attended">
            <Form.Label>Attended</Form.Label>
            {/* <Form.Control
            > */}
                
            <Form.Select name="attended"
            value={attended}
            onChange={e=>{setAttended(e.target.value)}} aria-label="Default select example">
                <option value={true}>Present</option>
                <option value={false}>Absent</option>
            </Form.Select>
            {/* </Form.Control> */}
            </Form.Group>
           
            <Button variant="secondary" type="submit" onClick={handler}>
            Add
          </Button>
            </Form>


      </Row>
        </Container>
    </div>
  )
}

export default Campus





   