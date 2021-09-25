import { ApolloProvider } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import AuthContext from './context';
import { Routes } from './Routes';
import Spinner from './Spinner/Spinner';
import { useClient } from './client';


interface IAppProps {

}

const App: React.FC<IAppProps> = ({ }) => {
    const [loading, setLoading] = useState(true)
    const [token, setAppToken] = useState<string | null>(null)
    const [citizenId, setCitizenId] = useState<string | null | undefined>(null)

    const [client] = useClient()

    const login = (token: string | null, citizenId?: string | null) => {
        setAppToken(token)
        setCitizenId(citizenId)
    }

    // useEffect(() => {
    //     fetch('http://localhost:4000/refresh_token', {
    //         credentials: 'include',
    //         method: 'POST',
    //     })
    //         .then(response => response.json())
    //         .then(refreshToken => {
    //             setAppToken(refreshToken.accessToken)
    //             setLoading(false)
    //         })
    // })

    // if (loading) {
    //     return <Spinner />
    // }

    return (
        <>
        <AuthContext.Provider value={{token, citizenId, login}} >
            <ApolloProvider client={client}>
                <Routes token={token}  />
            </ApolloProvider>
            </AuthContext.Provider>
        </>
    );
}

export {
    App
}