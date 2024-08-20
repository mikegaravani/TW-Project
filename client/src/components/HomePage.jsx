import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'

function HomePage() {
  const [error, setError] = useState('');



  return (
    <>

      <div>hdhdhdhhdhdhdhdhhdhd you in</div>
      { error && <Alert variant='danger'>{ error }</Alert> }
      <h2 className='text-center mb-4'>Profile</h2>
      {/* <Button variant='link' onClick={handleLogout}>Log out</Button> */}




    </>
  )
}

export default HomePage