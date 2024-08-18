import React, { useState } from 'react'

function LoginPage() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


  return (
    <div>
        <div>
            <h1>Login</h1>
            <form action="/login" method="post">
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" placeholder='user123'/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="text" name="password" placeholder='12345678'/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default LoginPage