import React,{useState} from 'react'
import {Toast} from "react-bootstrap"

function GoogleFormHandler(props){
    const [show, setShow] = useState(false);
    function handleLoad(e){
        e.preventDefault();
        setShow(true);
    }
    return (
    <div>
        <iframe id={props.id} name={props.id} className='googleFormResponse' onLoad={handleLoad}></iframe>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">{props.title}</strong>
          </Toast.Header>
          <Toast.Body>{props.children}</Toast.Body>
        </Toast>
    </div>
    );
}

export default GoogleFormHandler;