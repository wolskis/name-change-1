import { ApolloProvider } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Routes } from './Routes';
import Spinner from './Spinner/Spinner';
import { useClient } from './client';
import { getCitizenId, setAccessToken } from './context';


interface IAppProps {

}

const App: React.FC<IAppProps> = ({ }) => {
    const [loading, setLoading] = useState(true)
    const [token, setAppToken] = useState<string | null>(null)
    const [citizenId, setCitizenId] = useState<string | null>(null)

    const [client] = useClient()

    useEffect(() => {
        fetch('http://localhost:4000/refresh_token', {
            credentials: 'include',
            method: 'POST',
        })
            .then(response => response.json())
            .then(refreshToken => {
                setAccessToken(refreshToken.accessToken)
                setAppToken(refreshToken.accessToken)
                setLoading(false)
            }).then(()=> {
                const id = getCitizenId()
                setCitizenId(id)
            })
        
    },[])

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <ApolloProvider client={client}>
                <Routes token={token} citizenId={citizenId}  />
            </ApolloProvider>
        </>
    );
}

export {
    App
}