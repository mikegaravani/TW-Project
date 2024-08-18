import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import axios from 'axios'

function Signup() {
    const emailRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const userData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
        };

        try {
            await axios.post('/user', userData);
            // console.log("User created successfully:", response.data);
            // alert("User created successfully");
        } catch {
            setError('Failed to create an account');
        }

    }
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-3'>Sign Up</h2>
                { error && <Alert variant='danger'>{ error }</Alert> }
                <Form onSubmit={ handleSubmit }>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' ref={usernameRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id='password-confirm' className='mb-3'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button className='w-100' type='submit'>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account? Log in
        </div>
    </>
  )
}

export default Signup