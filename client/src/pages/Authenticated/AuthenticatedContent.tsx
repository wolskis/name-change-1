import React from 'react'
import { Route } from 'react-router-dom';
import { AuthenticatedHeader } from '../../Header/AuthenticatedHeader';
import { Home } from '../Home/Home';
import { Name } from '../MyName/Name';

const AuthenticatedContent: React.FC = () => {
    return (
        <>
        <AuthenticatedHeader  />
            <Route path="/my-name/:id" component={Name} />
            <Route path="/" component={Home} exact/>
        </>
    );
}

export {
    AuthenticatedContent
}