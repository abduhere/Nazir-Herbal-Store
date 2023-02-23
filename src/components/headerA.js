import { render } from "@testing-library/react";
import React, { Component, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import fireDatabase from "../firebase";

function HeaderA(props) {
  const [currentUser, setCurrentUser] = useState();
  fireDatabase.auth().onAuthStateChanged(() => {
    setCurrentUser(fireDatabase.auth().currentUser);
  });
  const handleLogout = () => {
    fireDatabase.auth().signOut();
  };

  return (
    <div>
      {/* <!-- Navbar Start --> */}
      <header className="admin navbar navbar-fixed">
        {/* <!-- Navbar Header Start --> */}
        <div className="navbar--header">
          {/* <!-- Logo Start --> */}
          <Link to="/admin/home" className="logo">
            <img src="./../assets/images/logo.png" alt="Nazir" />
          </Link>
          {/* <!-- Logo End --> */}

          {/* <!-- Sidebar Toggle Button Start --> */}
          {/* <!-- Sidebar Toggle Button End --> */}
        </div>
        {/* <!-- Navbar Header End --> */}

        {/* <!-- Sidebar Toggle Button Start --> */}

        {/* <!-- Sidebar Toggle Button End --> */}

        {/* <!-- Navbar Search Start --> */}
        {/* <div className="navbar--search">
                <form action="search-results.html">
                    <input type="search" name="search" className="form-control" placeholder="Search Something..." required/>
                    <button className="btn-link"><i className="fa fa-search"></i></button>
                </form>
            </div> */}
        {/* <!-- Navbar Search End --> */}

        <div className="navbar--nav ml-auto">
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fa fa-bell"></i>
                {/* <span className="badge text-white bg-blue">7</span> */}
              </a>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fa fa-envelope"></i>
                {/* <span className="badge text-white bg-blue">4</span> */}
              </a>
            </li>

            {/* <!-- Nav Language Start --> */}
            <li className="nav-item dropdown nav-language">
              <a href="#" className="nav-link" data-toggle="dropdown">
                <span>ENG</span>
                <i className="fa fa-caret-down" aria-hidden="true"></i>
              </a>

              <ul className="dropdown-menu">
                <li>
                  <a href="">
                    <span>ENG</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>URD</span>
                  </a>
                </li>
              </ul>
            </li>
            {/* <!-- Nav Language End --> */}

            {/* <!-- Nav User Start --> */}
            <li className="nav-item dropdown nav--user online">
              <a href="#" className="nav-link" data-toggle="dropdown">
                <img
                  src="./../assets/admin/img/avatar/profile.jpg"
                  alt=""
                  className="rounded-circle"
                />
                <span>Imtiaz Ahmed</span>
                <i className="fa fa-angle-down"></i>
              </a>

              <ul className="dropdown-menu">
                <li>
                  <a href="#">
                    <i className="far fa-user"></i>Profile
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-envelope"></i>Inbox
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-cog"></i>Settings
                  </a>
                </li>
                <li className="dropdown-divider"></li>
                <li>
                  <a href="#">
                    <i className="fa fa-lock"></i>Lock Screen
                  </a>
                </li>
                <li>
                  <Link to="/admin/login" onClick={() => handleLogout()}>
                    <i className="fa fa-power-off"></i>Logout
                  </Link>
                </li>
              </ul>
            </li>
            {/* <!-- Nav User End --> */}
          </ul>
        </div>
      </header>
      {/* <!-- Navbar End --> */}
    </div>
  );
}

export default HeaderA;
