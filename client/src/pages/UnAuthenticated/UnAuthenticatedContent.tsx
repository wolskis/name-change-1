import React from 'react'
import { Route } from 'react-router-dom';
import { UnAuthenticatedHeader } from '../../Header/UnauthenticatedHeader';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';

const UnAuthenticatedContent: React.FC = () => {
    return (
        <>
            <UnAuthenticatedHeader />
                <Route path="/" component={Home} exact />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </>
    );
}

export {
    UnAuthenticatedContent
}