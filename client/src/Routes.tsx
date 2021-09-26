// import React, { useEffect } from 'react';
// import { BrowserRouter, Switch, Route, Redirect, Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history'
// import { Home } from './pages/Home/Home';
// import './app.css'
// import { AuthenticatedContent } from './pages/Authenticated/AuthenticatedContent';
// import { UnAuthenticatedContent } from './pages/UnAuthenticated/UnAuthenticatedContent';
// import { AuthenticatedHeader } from './Header/AuthenticatedHeader';
// import { UnAuthenticatedHeader } from './Header/UnauthenticatedHeader';

// const Routes: React.FC<{ token?: string | null, citizenId: string | null }> = ({ token, citizenId }) => {

//   useEffect(() => {

//   }, [token, citizenId])

//   const history = createBrowserHistory()
//   return (
//     <div>
//       <main className='main-content'>
//         {(token && citizenId) ? (
//           <>

//             <AuthenticatedContent />
//           </>
//         ) : (
//           <>
//             <UnAuthenticatedContent />
//           </>
//         )}
//       </main>
//     </div>
//   )
// }

// export {
//   Routes
// }

import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Home } from './pages/Home/Home';
import './app.css'
import { AuthenticatedContent } from './pages/Authenticated/AuthenticatedContent';
import { UnAuthenticatedContent } from './pages/UnAuthenticated/UnAuthenticatedContent';
import { AuthenticatedHeader } from './Header/AuthenticatedHeader';
import { UnAuthenticatedHeader } from './Header/UnauthenticatedHeader';
import { Name } from './pages/MyName/Name';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login/Login';

const Routes: React.FC<{ token?: string | null, citizenId: string | null }> = ({ token, citizenId }) => {

  useEffect(() => {

  }, [token, citizenId])

  const history = createBrowserHistory()
  return (
    <BrowserRouter>
      <UnAuthenticatedHeader />
      <Switch>
        <div>
          <main className='main-content'>
            <Route path="/" component={Home} exact />
            {token && <Route path="/my-name/:id" component={(Name)} />}
            {!token && <Route path="/register" component={Register} />}
            {!token && <Route path="/login" component={Login} />}
            <Redirect to="/login" />
          </main>
        </div>
      </Switch>
    </BrowserRouter>
  )
}

export {
  Routes
}
