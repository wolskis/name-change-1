import { ApolloProvider } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Routes } from './Routes';
import Spinner from './Spinner/Spinner';
import { useClient } from './client';
import { Router, Switch } from 'react-router'
import { customHistory } from './history';
import { getCitizenId, setAccessToken } from './context';

const App: React.FC = () => {
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
        }).then(() => {
            const id = getCitizenId()
            setCitizenId(id)
        })
        
    }, [])
    
    if (loading) {
        return <Spinner />
    }
    
    return (
        <>
            <Router history={customHistory}>
                <ApolloProvider client={client}>
                    <Switch>
                        <Routes token={token} citizenId={citizenId} />
                    </Switch>
                </ApolloProvider>
            </Router>
        </>
    );
}

export {
    App
}