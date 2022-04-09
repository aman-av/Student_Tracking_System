import React from 'react'
import img from './ww.jpg'
function Head() {

    const myStyle={
        backgroundImage:{img},
                height:'100vh',
                marginTop:'-70px',
                fontSize:'50px',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                };

  return (
    <div style={myStyle}>Head</div>
  )
}

export default Head