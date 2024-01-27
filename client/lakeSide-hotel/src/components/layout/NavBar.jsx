import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
      <div className="container-fluid">
        <Link to="/">
          <span className="hotel-color"> lakeSide Hotel</span>
        </Link>
        <button
          className="navbartoggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-aria-controls="#navbarScroll"
          arial-expanded="false"
          aria-label="Toggle-navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navabar-nav-scroll">
            <li className="nav-item">
              <NavLink>Browse all rooms</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
