import React, { Component } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link, Redirect } from "react-router-dom";
import fireDatabase from "../firebase";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      loggedin: false,
      status: ""
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
          .ref("users/")
          .on("value", snapshot => {
            var userId = [];
            snapshot.forEach(value => {
              userId.push(value.key);
            });
            if (Verified && userId.includes(userCredentials.user.uid)) {
              this.setState({
                errorMessage: "Login Successfull!",
                loggedin: true
              });
            } else {
              this.setState({
                errorMessage: "Please verify E-mail to Log in Successfully",
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
      return <Redirect to="/" />;
    }
    return (
      <div>
        {/* < Header /> */}
        {/* <!-- Wrapper Start --> */}
        <div className="wrapper">
          {/* <!-- Login Page Start --> */}
          {/* this below commented div works with main.js */}
          {/* <div
            className="m-account-w"
            data-bg-img="/../assets/admin/img/1200x800.png"
          > */}
          <div
            className="m-account-w"
            style={{
              backgroundImage: "url(/../assets/admin/img/1200x800.png)"
            }}
          >
            <div className="m-account">
              <div className="row no-gutters">
                <div className="col-md-6">
                  {/* <!-- Login Content Start --> */}
                  <div
                    className="m-account--content-w"
                    style={{
                      backgroundImage: "url(/../assets/admin/img/1200x800.png)"
                    }}
                  >
                    <div className="m-account--content">
                      <h2 className="h2">Don't have an account?</h2>
                      <Link className="btn btn-rounded" to="/register">
                        Register Now
                      </Link>
                    </div>
                  </div>
                  {/* <!-- Login Content End --> */}
                </div>

                <div className="col-md-6">
                  {/* <!-- Login Form Start --> */}
                  <div className="m-account--form-w">
                    <div className="m-account--form">
                      {/* <!-- Logo Start --> */}
                      <div className="logo">
                        <Link to="/">
                          <img
                            style={{ width: "60%" }}
                            src="./../assets/images/logo.png"
                            alt="Nazir"
                          />
                        </Link>
                      </div>
                      {/* <!-- Logo End --> */}

                      <form action="#" method="post">
                        <label className="m-account--title">
                          Login to your account
                        </label>

                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <i className="fas fa-user"></i>
                            </div>

                            <input
                              type="email"
                              name="email"
                              placeholder="E-mail"
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
                        <div>{this.state.errorMessage}</div>

                        <div className="m-account--actions">

                          <Link
                            to="#"
                            className="btn btn-rounded btn-info"
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
                  {/* <!-- Login Form End --> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Login Page End --> */}
        </div>
        {/* <!-- Wrapper End --> */}
        {/* < Footer /> */}
      </div>
    );
  }
}

export default Login;
