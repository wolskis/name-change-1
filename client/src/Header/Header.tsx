import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useLogoutMutation } from '../generated/graphql';
import { useHistory } from 'react-router'
import './header.css'

interface IHeaderProps {
  token?: string | null
}

const Header: React.FC<IHeaderProps> = ({ token = true }) => {

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
            <NavLink to="/my-name">
              My Names
            </NavLink>
          </li>}
          {token && (
            <li>
              <NavLink to="/">
                Up Coming Names
              </NavLink>
            </li>
          )}
          {token && (
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
          {token && <li>
            <button onClick={async () => {
              await logout()
              history.push('/')
            }}>
              Logout
            </button>
          </li>}
        </ul>

      </div>
    </header>
  );
}

export {
  Header
}