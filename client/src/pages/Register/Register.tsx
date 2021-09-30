import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useCreateCitizenMutation } from '../../generated/graphql';
import { validateStringLength } from '../../helpers/helper';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [createCitizen] = useCreateCitizenMutation()

    return (
        <form className="auth-form" onSubmit={async e => {
            e.preventDefault();

            const isEmptyEmail = validateStringLength('Email', email)
            const isEmptyPassword =  validateStringLength('Name', name)
            const isEmptyName = validateStringLength('Password', password)

            if (!isEmptyEmail || !isEmptyPassword || !isEmptyName) {
                return
            }

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
            setEmail('')
            setPassword('')
            setName('')
            history.push('/login')
        }}>
            <div className="form-control">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="Email">Email</label>
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
            <div className="form-actions" >
                <button type="submit">Register</button>
            </div>
        </form>
    );
}

export {
    Register
}