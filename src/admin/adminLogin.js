import React, { Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link, Redirect } from "react-router-dom";
import fireDatabase from "../firebase";

class adminLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      loggedin: false
    };
  }

  updateEmail = ev => {
    this.setState({
      email: ev.target.value
    });
  };

  updatePassword = ev => {
    this.setState({
      password: ev.target.value
    });
  };

  handleLogin = () => {
    fireDatabase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        var Verified = userCredentials.user.emailVerified;
        var ref = fireDatabase
          .database()
          .ref("admins/")
          .on("value", snapshot => {
            var userId = [];
            snapshot.forEach(value => {
              userId.push(value.key);
            });
            if (userId.includes(userCredentials.user.uid)) {
              this.setState({
                errorMessage: "Login Successfull!",
                loggedin: true
              });
            } else {
              this.setState({
                errorMessage: "Invalid Details",
                loggedin: false
              });
              fireDatabase.auth().signOut();
            }
          });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({
          loggedin: false
        });
        if (errorCode === "auth/invalid-email") {
          this.setState({
            errorMessage: "Email Invalid"
          });
        } else if (errorCode === "auth/user-not-found") {
          this.setState({
            errorMessage: "Account not found!"
          });
        } else if (errorCode === "auth/wrong-password") {
          this.setState({
            errorMessage: "Incorrect Password"
          });
        } else {
          this.setState({
            errorMessage: errorMessage
          });
        }
      });
    this.handleRedirect();
  };

  handleRedirect = () => {
    if (this.state.loggedin) {
      console.log("logged in");
    } else {
      console.log("not logged in");
    }
  };

  render() {
    if (this.state.loggedin) {
      return <Redirect to="/admin/home" />;
    }
    return (
      <div>
        {/*<!-- Wrapper Start -->*/}
        <div className="wrapper">
          {/*<!-- Register Page Start -->*/}
          <div
            className="m-account-w"
            style={{
              backgroundImage: "url(/../assets/admin/img/1200x800.png)"
            }}
          >
            <div className="m-account">
              <div className="row no-gutters flex-row-reverse justify-content-center">
                <div className="col-md-6">
                  {/*<!-- Register Form Start -->*/}
                  <div className="m-account--form-w">
                    <div className="m-account--form">
                      {/*<!-- Logo Start -->*/}
                      <div className="logo">
                        <img
                          style={{ width: "60%" }}
                          src="./../assets/images/logo.png"
                          alt="Nazir"
                        />
                      </div>
                      {/*<!-- Logo End -->*/}

                      <form action="#" method="post">
                        <label className="m-account--title">
                          Welcome, Admin
                        </label>

                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <i className="fas fa-envelope"></i>
                            </div>

                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              className="form-control"
                              autocomplete="off"
                              required
                              onChange={event => {
                                this.updateEmail(event);
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <i className="fas fa-key"></i>
                            </div>

                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              className="form-control"
                              autocomplete="off"
                              required
                              onChange={event => {
                                this.updatePassword(event);
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className={
                            this.state.errorMessage ===
                            "Account created successfully!"
                              ? "m-account--title"
                              : "m-account--title text-danger"
                          }
                        >
                          {this.state.errorMessage}
                        </div>
                        <div className="m-account--actions">
                          <Link
                            to="#"
                            type="submit"
                            className="btn btn-block btn-rounded btn-info"
                            onClick={() => {
                              this.handleLogin();
                            }}
                          >
                            Login
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/*<!-- Register Form End -->*/}
                </div>
              </div>
            </div>
          </div>
          {/*<!-- Register Page End -->*/}
        </div>
        {/*<!-- Wrapper End -->*/}
      </div>
    );
  }
}

export default adminLogin;
