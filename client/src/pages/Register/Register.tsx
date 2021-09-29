import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useCreateCitizenMutation } from '../../generated/graphql';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [createCitizen] = useCreateCitizenMutation()

    return (
        <form className="auth-form" onSubmit={async e => {
            e.preventDefault();
            console.log('form submitted')
            await createCitizen({
                variables: {
                    citizenInput: {
                        name,
                        email,
                        password
                    }
                }
            })

            history.push('/login')
        }}>
            <div className="form-control">
                <input
                    value={name}
                    type="text"
                    placeholder="name"
                    onChange={e => {
                        setName(e.target.value)
                    }}
                />
            </div>
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
            <div className="form-actions" >
                <button type="submit">Register</button>
            </div>
        </form>
    );
}

export {
    Register
}