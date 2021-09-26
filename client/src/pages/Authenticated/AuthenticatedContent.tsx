import React from 'react'
import {  Route, Switch, withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticatedHeader } from '../../Header/AuthenticatedHeader';
import { Home } from '../Home/Home';
import { Name } from '../MyName/Name';

interface IAuthenticatedContentProps {

}

const AuthenticatedContent: React.FC<IAuthenticatedContentProps> = ({ }) => {
    return (
        <>
        <BrowserRouter>
        <AuthenticatedHeader  />
        <Switch>
            <Route path="/my-name/:id" component={withRouter(Name)} />
            <Route path="/" component={Home} exact/>
            </Switch>
        </BrowserRouter>
        </>
    );
}

export {
    AuthenticatedContent
}