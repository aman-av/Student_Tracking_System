import React,{useState,useEffect} from 'react'
import useForm from '../modules/formWithSubmit/useForm'
import { Container,Row,Form,Button,Tabs,Tab,Col} from 'react-bootstrap'
import axios from "axios"
import validator from 'validator'
import { useNavigate } from 'react-router-dom';
import GoogleFormHandler from '../modules/googleFormHandler/GoogleFormHandler'

function Login(props) {



      const navigate = useNavigate();
      const [username, setUsername] = useState("")
      const [password, setPassword] = useState("")
      const [type, setType] = useState("Student")
      const [department,setDepartment] = useState("Student")
      
      useEffect(() => {
        if(type==="Admin"&& department==="Student")
       setDepartment("Campus")
      }, [type])
    
   const handler = (e) =>{
       e.preventDefault();

       console.log({username,password,type,department})
       axios.post('login', {
       username:username,
       password:password,
       type:type,
       department:department
      })
      .then(function (response) {
        localStorage.setItem("username",username)
        navigate(`${response.data.redirect}`)

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
   }

  return (
    <Container fluid>
   <h1 style={{marginTop:"2%"}}>Login Page</h1>
      <Row style={{margin: "3% 20% 3% 20%", textAlign: "left"}}>
            <Form>
            <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter Username"
              value={username}

              onChange={e=>{ setUsername(e.target.value)}}
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
            <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            {/* <Form.Control
            > */}
                
            <Form.Select name="type"
            value={type}
            onChange={e=>{setType(e.target.value)}} aria-label="Default select example">
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
            </Form.Select>
            {/* </Form.Control> */}
            </Form.Group>
            {type==="Admin"?<div>
             
            <Form.Group className="mb-3" controlId="department">
            <Form.Label>Department</Form.Label>
                
            <Form.Select name="department"

            value={department}
            onChange={e=>{setDepartment(e.target.value);console.log(e.target.value)}}  >
                <option value="Campus">Campus</option>
                <option value="Warden">Warden</option>
            </Form.Select>
            </Form.Group>
            </div>:<div></div>}
            <Button variant="secondary" type="submit" onClick={handler}>
            Login
          </Button>
            </Form>


      </Row>
     



    </Container>
  );

}

export default Login