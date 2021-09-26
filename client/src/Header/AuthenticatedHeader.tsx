import React, { useEffect, useState } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom';
import { getCitizenId } from '../context';
import { useLogoutMutation } from '../generated/graphql';
import './header.css'

interface IAuthenticatedHeaderProps {
}

const AuthenticatedHeader: React.FC<IAuthenticatedHeaderProps> = ({  }) => {

  const [citizenId, setCitizenId] = useState<string | null>()
  
  useEffect(() => {
    const id = getCitizenId()
    setCitizenId(id)
  }, [citizenId])

  const history = useHistory()
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