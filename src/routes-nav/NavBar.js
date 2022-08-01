import React, {useContext} from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from "../UserContext";
import "./Nav.css";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
 
  console.log(currentUser);
 

  function loggedOut(){
    return (
        <nav className="Nav">
         
          <NavLink exact to="/">Home</NavLink>
          <NavLink exact to="/companies">Companies</NavLink>
          <NavLink exact to="/jobs">Jobs</NavLink>
          <NavLink exact to="/profile">Profile</NavLink>
           
            <NavLink exact to="/login">Login</NavLink>
        </nav>
    );
  }

  function loggedIn(){
    return (
        <nav className="Nav">
         
          <NavLink exact to="/">Home</NavLink>
          <NavLink exact to="/companies">Companies</NavLink>
          <NavLink exact to="/jobs">Jobs</NavLink>
          <NavLink exact to="/profile">Profile</NavLink>
            <NavLink exact to="/" onClick={logout}>Logout</NavLink>
            
        </nav>
    );
  }
  
  return (
    <nav className="Nav">
      <Link to="/">
        Jobly
      </Link>
      {currentUser ? loggedIn() : loggedOut()}
    </nav>
);
}

export default NavBar;