import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { getCitizenId } from '../helpers/context';
import { useLogoutMutation } from '../generated/graphql';
import './header.css'


const AuthenticatedHeader: React.FC = () => {

  const [citizenId, setCitizenId] = useState<string | null>()
  const history = useHistory()
  useEffect(() => {
    const id = getCitizenId()
    setCitizenId(id)
  }, [citizenId])

  const [logout] = useLogoutMutation()

  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>Name-Change</h1>
      </div>
      <div className="main-navigation__items">
        <ul>
          <li>
            <NavLink to={`/my-name/${citizenId}`}>
              My Names
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              Up Coming Names
            </NavLink>
          </li>
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
        </ul>

      </div>
    </header>
  );
}

export {
  AuthenticatedHeader
}