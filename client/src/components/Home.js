import React from 'react'
import { Container,Row,Col,Button} from 'react-bootstrap'
function Home() {
  return (
    <div
    >
        <Container >
            <Row>
        <div style={{fontSize:"2.4rem",fontWeight:"bold",margin:"20% 0 4% 0"}}>
        Welcome To Our Tracking System <br/>Problem No. 351
        </div>    
    <div style={{margin:"1% 20% 0 0%"}}>

    <Button variant="secondary" href="/Login">
        Login
    </Button>
    </div>
            </Row>  
        </Container>
    </div>
  )
}

export default Home