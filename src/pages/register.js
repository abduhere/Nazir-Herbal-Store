import React, { Component } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link, Redirect } from "react-router-dom";
import fireDatabase from "../firebase";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: "",
      contactNumber: "",
      shippingAddress: "",
      errorMessage: "",
      registered: false
    };
  }

  updateEmail = ev => {
    this.setState({
      email: ev.target.value
    });
  };

  updateName = ev => {
    this.setState({
      name: ev.target.value
    });
  };

  updatePassword = ev => {
    this.setState({
      password: ev.target.value
    });
  };

  updateContactNumber = ev => {
    this.setState({
      contactNumber: ev.target.value
    });
  };

  updateShippingAddress = ev => {
    this.setState({
      shippingAddress: ev.target.value
    });
  };

  handleRegister = () => {
    fireDatabase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        fireDatabase
          .database()
          .ref("users/")
          .child(userCredentials.user.uid)
          .set({
            name: this.state.name,
            contactNumber: this.state.contactNumber,
            shippingAddress: this.state.shippingAddress
          });

        userCredentials.user.updateProfile({
          displayName: this.state.name
        });

        this.setState({
          errorMessage: "Account created! Verification E-mail sent",
          registered: true
        });
        userCredentials.user
          .sendEmailVerification()
          .then(function() {
            // Email sent.
            console.log("email sent");
          })
          .catch(function(error) {
            console.log("email not sent");
            // An error happened.
          });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          this.setState({
            errorMessage: "Email already in use!"
          });
        } else if (errorCode === "auth/weak-password") {
          this.setState({
            errorMessage: "Password streangth is too weak!"
          });
        } else {
          this.setState({
            errorMessage: errorMessage
          });
        }
      });
  };

  render() {
    if (this.state.registered === true) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        {/* < Header /> */}
        {/* <!-- Wrapper Start --> */}
        <div className="wrapper">
          {/* <!-- Register Page Start --> */}
          <div
            className="m-account-w"
            data-bg-img="/../assets/admin/img/1200x800.png"
          >
            <div className="m-account">
              <div className="row no-gutters flex-row-reverse">
                <div className="col-md-6">
                  {/* <!-- Register Content Start --> */}
                  <div
                    className="m-account--content-w"
                    data-bg-img="/../assets/admin/img/1200x800.png"
                  >
                    <div className="m-account--content">
                      <h2 className="h2">Have an account?</h2>
                      <Link className="btn btn-rounded" to="/login">
                        Login Now
                      </Link>
                    </div>
                  </div>
                  {/* <!-- Register Content End --> */}
                </div>

                <div className="col-md-6">
                  {/* <!-- Register Form Start --> */}
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
                          Create your account
                        </label>

                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <i className="fas fa-user"></i>
                            </div>

                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              className="form-control"
                              autoComplete="on"
                              required
                              onChange={event => {
                                this.updateName(event);
                              }}
                            />
                          </div>
                        </div>

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
                              autoComplete="on"
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
                              autoComplete="on"
                              required
                              onChange={event => {
                                this.updatePassword(event);
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <i className="fas fa-phone"></i>
                            </div>

                            <input
                              type="text"
                              name="Contact"
                              placeholder="Contact"
                              className="form-control"
                              autoComplete="on"
                              required
                              onChange={event => {
                                this.updateContactNumber(event);
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <i className="fas fa-building"></i>
                            </div>

                            <textarea
                              type="text"
                              name="address"
                              placeholder="Shipping Address"
                              className="form-control"
                              autoComplete="on"
                              required
                              onChange={event => {
                                this.updateShippingAddress(event);
                              }}
                            ></textarea>
                          </div>
                        </div>

                        <div className="m-account--title">
                          {this.state.errorMessage}
                        </div>

                        <div className="m-account--actions">
                          <Link
                            to="#"
                            className="btn btn-block btn-rounded btn-info"
                            onClick={() => {
                              this.handleRegister();
                            }}
                          >
                            {" "}
                            Register{" "}
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* <!-- Register Form End --> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Register Page End --> */}
        </div>
        {/* <!-- Wrapper End --> */}
        {/* < Footer /> */}
      </div>
    );
  }
}

export default Register;
