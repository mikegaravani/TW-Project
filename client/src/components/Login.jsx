import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './user-components/user-style.css';

function Login() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()

        const userData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const response = await axios.post('/user/login', userData);
            const token = response.data.token;

            if (token) {
                localStorage.setItem('token', token);
                console.log('User logged in successfully, and token retrieved!');

                navigate('/');
            }
            else {
                setError('Failed to log in (no token retrieved)');
            }

            
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Failed to log in');
            } else if (err.request) {
                setError('No response from the server');
            } else {
                setError('Error occurred during the request');
            }
        }

    }
  return (
    <>  
        <div className='auth-container'>
            <div className='auth-inner'>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-3'>Log in</h2>
                        { error && <Alert variant='danger'>{ error }</Alert> }
                        <Form onSubmit={ handleSubmit }>
                            <Form.Group id='username'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' ref={usernameRef} required />
                            </Form.Group>
                            <Form.Group id='password'className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required />
                            </Form.Group>
                            <Button className='w-100' type='submit'>Log in</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Need an account? <Link to='/signup'>Sign up</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login