import { render } from "@testing-library/react";
import React, { Component, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import fireDatabase from "../firebase";

function Header(props) {
  const [navbar, setnavbar] = useState(false);
  const [currentUser, setCurrentUser] = useState(fireDatabase.auth().onAuthStateChanged(() => {
    setCurrentUser(fireDatabase.auth().currentUser);
  }));

  const changeBackground = () => {
    if (window.scrollY) {
      setnavbar(true);
    } else {
      setnavbar(false);
    }
  }
  window.addEventListener("scroll", changeBackground);

  const handleLogout = () => {
    fireDatabase.auth().signOut();
  }

  return (
    // <!-- pageHeader -->
    <header
      id="header"
      className={`${
        navbar ? "scrolling" : "to-scroll"
        } pt-lg-5 pt-md-3 pt-2 pb-2 position-absolute w-100 fixed `}
    >
      <div className="container-fluid px-xl-17 px-lg-5 px-md-3 px-0 d-flex flex-wrap">
        <div className="col-6 col-sm-3 col-lg-2 order-sm-2 order-md-0 dis-none">
          <ul className="nav nav-tabs langList pt-xl-6 pt-lg-4 pt-3 border-bottom-0">
            <li className="dropdown">
              <div className="text-uppercase">ENG</div>
            </li>
            <li className="dropdown">
              <div className="text-uppercase">PKR</div>
            </li>
          </ul>
        </div>
        <div className="col-12 col-sm-6 col-lg-8 static-block">
          {/* <!-- mainHolder --> */}
          <div className="mainHolder justify-content-center">
            {/* <!-- pageNav1 --> */}
            <nav className="navbar navbar-expand-lg navbar-light p-0 pageNav1 position-static">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto text-uppercase d-inline-block">
                  <li className="nav-item">
                    <Link className="d-block" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="d-block" to="/store">
                      Store
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="d-block" to="/feedback">
                      Feedback
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nLogo" to="/">
                      <img
                        src="./../assets/images/logo.png"
                        alt="Nazir"
                        className="img-fluid"
                      />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="d-block" to="/productList">
                      {currentUser === null ? "" : "Product List"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="d-block" to="/login">
                      {currentUser === null ? "Login" : ""}
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="d-block" to="#">
                      {currentUser === null ? "" : "Profile"}
                    </Link>
                    <ul className="list-unstyled text-capitalize border-right border-bottom border-left dropdown-menu mt-0 py-0">
                      {/* <li className="d-block mx-0" ><Link to="/profile">My Profile</Link></li> */}
                      <li className="d-block mx-0" ><Link to="/orderHistory">Order History</Link></li>
                      <li className="d-block mx-0" ><Link to="/" onClick={() => handleLogout()}> Logout </Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="logo">
              <a href="home.html">
                <img src="images/logo.png" alt="Nazir" className="img-fluid" />
              </a>
            </div>
          </div>
        </div>

        <div className="col-6 col-sm-3 col-lg-2 order-sm-3 order-md-0 dis-none">
          {/* <!-- wishList --> */}
          <ul className="nav nav-tabs wishList pt-xl-5 pt-lg-4 pt-3 mr-xl-3 mr-0 justify-content-end border-bottom-0">


            <li className="nav-item">
              <Link className="nav-link position-relative icon-cart" to="/cart">
                <span className="num rounded d-block">
                  {" "}
                  {props.shoppingCart.length}{" "}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
