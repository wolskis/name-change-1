import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './Header/Header';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Name } from './pages/MyName/Name';
import { Register } from './pages/Register/Register';
import './app.css'

const Routes: React.FC<{token?: string | null}> = ({token = true}) => {
  
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main className='main-content'>
        <Switch>
          {<Route path="/" component={Home} exact />}
          {true && <Route path="/my-name" component={Name} exact />}
          {true && <Route path="/register" component={Register} exact />}
          {true && <Route path="/login" component={Login} exact />}
          {true && <Redirect to="/login" exact />}
          
        </Switch>
        </main>
      </div>
    </BrowserRouter>
  )
}

export {
  Routes
}
