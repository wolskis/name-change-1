import React from 'react'
import { Redirect, Route, RouteComponentProps, withRouter } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { UnAuthenticatedHeader } from '../../Header/UnauthenticatedHeader';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';

const UnAuthenticatedContent: React.FC = ({ }) => {
    return (
        <BrowserRouter>
            <UnAuthenticatedHeader />
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={withRouter(Login)} />
                <Route path="/" component={Home} exact />
                <Redirect to="/login" />
            </Switch>
        </BrowserRouter>
    );
}

export {
    UnAuthenticatedContent
}