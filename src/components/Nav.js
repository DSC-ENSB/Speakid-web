import React from 'react';
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav justify-content-between" id="nav">
      <h5 className="nav-link h-brand">Speakid</h5>
      <div className="d-flex">
        <NavLink activeClassName="selected" className="nav-link" to="/docs">Docs</NavLink>
        <NavLink activeClassName="selected" className="nav-link" to="/about">About</NavLink>
        <NavLink activeClassName="selected" className="nav-link" to="/price">Pricing</NavLink>
      </div>
      <NavLink className="nav-link log-in" to="/login">LOGIN</NavLink>
    </nav>
  )
}
export default Nav;