import React,{useState,useEffect} from 'react'
import { Button ,Form,Container,Row,Col} from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Warden() {
    const navigate = useNavigate();

    const [page, setpage] = useState("")
    const [time,setTime] = useState("")
    const [username, setUsername] = useState("")
    const [date, setDate] = useState("")
    const [data, setData] = useState("")

    const handler = async (e) =>{
        e.preventDefault();
        console.log({username,date})
        const res = await axios.get('/hat', {
          params: {
            username: username,
            datee:date
            //   date:date
          }
        });
         const dd= await res.data.message;
         setData(dd);
        console.log("dd",dd)
        console.log("ddd",res.data.message)
        if(res.data.message==="in"&&res.data.message==="out")
        await setpage("1")
        // console.log(page)

          // console.log(data)
    
    
    }

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
      //  navigate(`${response.data.redirect}`)
       console.log(response);
     })
     .catch(function (error) {
       console.log(error);
     });
     window.location.reload(true)
  }

  const handler3 = async (e) =>{
    e.preventDefault();
    
    console.log({username,date})
    const res = await axios.get('/vat', {
        headers: {  
          username: username,
          datee:date
        //   date:date
        }
      });
      console.log("data",res.data.message)
      const dd= await res.data.message;
      setData(dd);
      console.log("dd",dd)
      console.log("ddd",res.data.message)

      if(res.data.message==="in"&&res.data.message==="out")
       await setpage("2")
        // console.log(page)
  

}


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
   window.location.reload(true)

}


    // const handler = async (e) => {
    //     e.preventDefault()
    //     console.log(username,date)
    //     try {
    //         const response = await axios.get(`/hat`, {
    //             method: 'GET',
    //             body: JSON.stringify({
    //                 username: username ,
    //                 date:date
    //             }),
    //             headers: {
    //                 "Content-type": "application/json; charset=UTF-8"
    //             }
    //         })
    //             .then(response => response.json())
    //             .then(json => console.log(json));
    //         console.warn(response.data);
    //     } catch (error) {
    //         console.warn(error);
    //     }
    // }

    
    
  const handlerlogout = () => {
    
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
  return (<div>
    <Container>
      <h1>Warden</h1>
      <div style={{textAlign:"right"}}>

      <Button  variant="secondary" onClick ={handlerlogout}>Logout</Button>
      </div>
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
            <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              name="date"
              type="text"
              placeholder="DD/MM/YYYY Date Format"
            //   value="passwordver"
            
              value={date}
              onChange={e=>{setDate(e.target.value)}}
            />
            </Form.Group>
            {data!=="out"&&data!=="in"?<div>
            <Button variant="secondary"  onClick={e=>{handler(e);setpage("1")}}>
            Daily Entry
          </Button>
          <Button variant="secondary" style={{marginLeft:"5%"}} onClick={e=>{handler3(e);setpage("2")}}>
          Vacation entry
          </Button></div>:
          null}
        </Form>
        
        {
        page==="1"&&data==="out"?<div >
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
            <Button variant="secondary" type="submit" onClick={handler2}>
            Add
          </Button>
        </div>:page==="1"&&data==="in"?<div>
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
            <Button variant="secondary" type="submit" onClick={handler2}>
            Add
          </Button>
        </div>:page==="2"&&data==="out"?
        <div>
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
            <Button variant="secondary" type="submit" onClick={handler4}>
            Add
          </Button>
        </div>
        :page==="2"&&data==="in"?
        <div>
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
            <Button variant="secondary" type="submit" onClick={handler4}>
            Add
          </Button>

        </div>
        :null
      }
        
        
              </Row>
              </Container>
    </div>
  )
}

export default Warden