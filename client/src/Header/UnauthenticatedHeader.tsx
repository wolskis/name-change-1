import React from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { useLogoutMutation } from '../generated/graphql';
import './header.css'


const UnAuthenticatedHeader: React.FC<{token?: string|null}> = ({token}) => {

  const [logout] = useLogoutMutation()
  const history = useHistory()

  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>Name-Change</h1>
      </div>
      <div className="main-navigation__items">
        <ul>
          {token && <li>
            <NavLink to={`/my-name/${token}`}>
              My Name
            </NavLink>
          </li>}
          <li>
            <NavLink to="/">
              Up Coming Names
            </NavLink>
          </li>
          {!token && (
            <>
              <li>
                <NavLink to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
          {token && (
            <li>
              <button onClick={async () => {
                await logout()
                localStorage.removeItem('citizenId')
                localStorage.removeItem('token')
                history.push('/login')
              }}>
                Logout
              </button>
            </li>
          )}
        </ul>

      </div>
    </header>
  );
}

export {
  UnAuthenticatedHeader
}