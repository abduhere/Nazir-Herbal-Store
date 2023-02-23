import { render } from "@testing-library/react";
import React, { Component, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import fireDatabase from "../firebase";

function SidebarA(props) {
  const [navbar, setnavbar] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(true);
  const [currentUser, setCurrentUser] = useState(fireDatabase.auth().onAuthStateChanged(() => {
    setCurrentUser(fireDatabase.auth().currentUser);
  }))

  // if (currentUser !== null && currentUser !== undefined) {
  //   fireDatabase.database().ref("admins/").child(currentUser.uid).on("value", snapshot => {
  //     if (snapshot.val().role === "Super Admin") {
  //       setSuperAdmin(true);
  //     }
  //   });
  // }

  const handleLogout = () => {
    fireDatabase.auth().signOut();
  };
  return (
    // {/*<!-- footerHolder -->*/}
    <div>
      {/* <!-- Sidebar Start --> */}
      <aside className="sidebar" data-trigger="scrollbar">
        {/* <!-- Sidebar Profile Start --> */}
        <div className="sidebar--profile">
          <div className="profile--img">
            <a href="#">
              <img
                src="./../assets/admin/img/avatar/profile.jpg"
                alt=""
                className="rounded-circle"
              />
            </a>
          </div>

          <div className="profile--name">
            <a href="#" className="btn2-link">
              Imtiaz Ahmed
            </a>
          </div>

          <div className="profile--nav">
            <ul className="nav">
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link"
                  title="User Profile"
                >
                  <i className="fa fa-user"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link"
                  title="Lock Screen"
                >
                  <i className="fa fa-lock"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link"
                  title="Messages"
                >
                  <i className="fa fa-envelope"></i>
                </a>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/login"
                  onClick={() => handleLogout()}
                  title="Logout"
                >
                  <i className="fa fa-sign-out-alt"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- Sidebar Profile End --> */}

        {/* <!-- Sidebar Navigation Start --> */}
        <div className="sidebar--nav">
          <ul>
            <li>
              <ul>
                <li className="active">
                  <Link to="/admin/home">
                    <i className="fa fa-home"></i>
                    <span>Home</span>
                  </Link>
                </li>
                <li>


                  <li>
                    <Link to="/admin/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/admin/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/admin/feedback">Feedback</Link>
                  </li>
                  <li>
                    <Link to="/admin/manage">Admin Management</Link>
                  </li>

                </li>
              </ul>
            </li>

            {/* Apps and chart section commented */}
            {/* <li>
                        <a href="#">Apps and Charts</a>

                        <ul>
                            <li>
                                <a href="#">
                                    <i className="far fa-envelope"></i>
                                    <span>Mailbox</span>
                                </a>

                                <ul>
                                    <li><a href="mailbox_inbox.html">Inbox</a></li>
                                    <li><a href="mailbox_compose.html">Compose</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="calendar.html">
                                    <i className="far fa-calendar-alt"></i>
                                    <span>Calendar</span>
                                </a>
                            </li>
                            <li>
                                <a href="chat.html">
                                    <i className="far fa-comments"></i>
                                    <span>Chat</span>
                                </a>
                            </li>
                            <li>
                                <a href="contacts.html">
                                    <i className="far fa-address-book"></i>
                                    <span>Contacts</span>
                                </a>
                            </li>
                            <li>
                                <a href="notes.html">
                                    <i className="far fa-sticky-note"></i>
                                    <span>Notes</span>
                                </a>
                            </li>
                            <li>
                                <a href="todo-list.html">
                                    <i className="fa fa-tasks"></i>
                                    <span>Todo List</span>
                                </a>
                            </li>
                            <li>
                                <a href="search-results.html">
                                    <i className="fa fa-search"></i>
                                    <span>Search Results</span>
                                </a>
                            </li>
                        </ul>
                    </li> */}
          </ul>
        </div>
        {/* <!-- Sidebar Navigation End --> */}
      </aside>
      {/* <!-- Sidebar End --> */}
    </div>
  );
}

export default SidebarA;
