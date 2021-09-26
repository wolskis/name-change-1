import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import './header.css'


const UnAuthenticatedHeader: React.FC = () => {
  
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>Name-Change</h1>
      </div>
      <div className="main-navigation__items">
        <ul>
          <li>
            <NavLink to="/">
              Up Coming Names
            </NavLink>
          </li>
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
        </ul>

      </div>
    </header>
  );
}

export {
  UnAuthenticatedHeader
}