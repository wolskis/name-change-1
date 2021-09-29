import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { setAccessToken, setCitizenId } from '../../helpers/context';
import { validateStringLength } from '../../helpers/helper';
import './login.css'

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory()
    
        return (
            <form className="auth-form" onSubmit={ async e=> {
                e.preventDefault();

                const isEmptyEmail = validateStringLength('Email', email)
                const isEmptyPassword = validateStringLength('Password', password)

                if (!isEmptyEmail || !isEmptyPassword) {
                    return
                }

                const response = await fetch('http://localhost:4000/login', {
                    credentials:'include',
                    method: 'POST',
                    body: JSON.stringify({email, password}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
                const result = await response.json()
                if (result.error) {
                    alert(result.error)
                }

                if (result.ok) {
                    setAccessToken(result.token)
                    setCitizenId(result.citizenId)
                    history.push(`/my-name/${result.citizenId}`)
                }
            }}>
                <div className="form-control">
                <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        type="email"
                        placeholder="email"
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div className="form-control">
                <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        type="password"
                        placeholder="password"
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Login</button>
                </div>
            </form>
        );
}

export {
    Login
}