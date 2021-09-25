import React, { useContext, useState } from 'react'
import { RouteComponentProps } from 'react-router';
import AuthContext from '../../context';
import './login.css'

const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const appContext = useContext(AuthContext)

        return (
            <form className="auth-form" onSubmit={ async e=> {
                e.preventDefault();
                console.log('form submitted')

                const response = await fetch('http://localhost:4000/login', {
                    method: 'POST',
                    body: JSON.stringify({email, password}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const result = await response.json()
                console.log('c',result.token)

                if (result.ok) {
                    appContext.login(result.token, result.citizenId)
                    console.log('ap', appContext.token)
                    history.push(`\my-name\${result.citizenId}`)
                }

            }}>
                <div className="form-control">
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