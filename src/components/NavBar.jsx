import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate()
  
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    // Check if the token is present in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogOut=()=>{
    setLoggedIn(false);
    navigate('/logout')

  }
  const handleLogin=()=>{
    setLoggedIn(false);
    navigate('/logout')

  }

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <Link to="/course">Course Form</Link>
          </li>
          <li>
            <button onClick={handleLogOut}>Log Out</button>
          </li>
        </>
      )}
      {!isLoggedIn && (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <>
      <div className="navbar  bg-opacity-50 max-w-screen-xl bg-cyan-800 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a href="/" className="btn btn-ghost text-xl">
            Course Management
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Search</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
