import React, { Component } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import fireDatabase from "../firebase";
import { NavLink, Link } from "react-router-dom";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      comments: "",
      address: "",
      name: "",
      email: "",
      contact: "",
      orderId: "",
      currentUser: fireDatabase.auth().currentUser
    };
  };

  componentDidMount = () => {
    if (this.state.currentUser !== null) {
      console.log(this.state.currentUser)
      console.log("here")
      var ref = fireDatabase.database().ref("users/").child(this.state.currentUser.uid);
      ref.on("value", snapshot => {
        console.log(snapshot);
        this.setState({
          name: snapshot.val().name,
          email: this.state.currentUser.email,
          contact: snapshot.val().contactNumber,
          address: snapshot.val().shippingAddress
        });
      });
    }
  };

  placeOrder() {
    var myRef = fireDatabase.database().ref("orders/");
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

    var newData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      contact: document.getElementById("contact").value,
      address: document.getElementById("address").value,
      comments: document.getElementById("note").value,
      total: this.props.cartTotal,
      items: JSON.parse(localStorage.getItem("nhsCart")),
      date: date,
      status: "Pending"
    };

    var insert = myRef.push(newData);

    if (this.state.currentUser !== null) {
      var ref = fireDatabase.database().ref("users/").child(this.state.currentUser.uid);
      ref.child("orders").push(insert.key);
    }
    
    localStorage.setItem("orderId", JSON.stringify(insert.key));
    localStorage.removeItem("nhsCart");
    this.props.emptyCart();
  };

  render() {
    return (
      <div>
        <Header shoppingCart = {this.props.shoppingCart} />
        <main>
          <section
            className="introBannerHolder d-flex w-100 bgCover"
            style={{ backgroundImage: "url(./../assets/images/1263x300.png)" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
                  <h1 className="headingIV fwEbold playfair mb-4">My Cart</h1>
                  <ul className="list-unstyled breadCrumbs d-flex justify-content-center">
                    <li className="mr-sm-2 mr-1">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="mr-sm-2 mr-1">/</li>
                    <li className="mr-sm-2 mr-1">
                      <Link to="/store">Shop</Link>
                    </li>
                    <li className="mr-sm-2 mr-1">/</li>
                    <li className="active">My Cart</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- cartHolder --> */}
          <div className="cartHolder container pt-xl-21 pb-xl-24 py-lg-20 py-md-16 py-10">
            <div className="row">
              {/*<!-- table-responsive -->*/}
              <div className="col-12 table-responsive mb-xl-22 mb-lg-10 mb-md-16 mb-10">
                {/*<!-- cartTable -->*/}
                <table className="table cartTable">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-uppercase fwEbold border-top-0"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="text-uppercase fwEbold border-top-0"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="text-uppercase fwEbold border-top-0"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="text-uppercase fwEbold border-top-0"
                      >
                        Total (After Discount)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.shoppingCart.map(value => {
                      return (
                        <tr className="align-items-center">
                          <td className="d-flex align-items-center border-top-0 border-bottom px-0 py-6">
                            <div className="imgHolder">
                              <img
                                src={value.image}
                                alt="Product Graphics"
                                className="img-fluid"
                              />
                            </div>
                            <div style={{ width: "100%" }}>
                              <span className="title pl-2">
                                <Link to={{pathname: "/productDetail", state: {value}}}> {value.title} </Link>
                              </span>
                            </div>
                          </td>
                          <td className="fwEbold border-top-0 border-bottom px-0 py-6">
                            {" "}
                            Rs. {value.price}{" "}
                          </td>
                          <td className="border-top-0 border-bottom px-0 py-6">
                            {" "}
                            {value.quantity}{" "}
                          </td>
                          <td className="fwEbold border-top-0 border-bottom px-0 py-6">
                            {" "}
                            Rs. {value.price - value.discount}{" "}
                            <Link to="#" className="fas fa-times float-right" onClick={() => this.props.removeItem(value)}></Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <form
                  action="javascript:void(0);"
                  className="couponForm mb-md-0 mb-5"
                >
                  <fieldset>
                    <div className="mt-holder d-inline-block align-bottom mr-lg-5 mr-0 mb-lg-0 mb-2">
                      <label
                        for="name"
                        className="fwEbold text-uppercase d-block mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={this.state.currentUser === null ? undefined : this.state.name}
                      />
                    </div>
                    <div className="mt-holder d-inline-block align-bottom mr-lg-5 mr-0 mb-lg-0 mb-2">
                      <label
                        for="contact"
                        className="fwEbold text-uppercase d-block mb-1"
                      >
                        Contact
                      </label>
                      <input
                        type="text"
                        id="contact"
                        className="form-control"
                        value={this.state.currentUser === null ? undefined : this.state.contact}
                      />
                    </div>
                    <div className="mt-holder d-inline-block align-bottom mr-lg-5 mr-0 mb-lg-0 mb-2">
                      <label
                        for="email"
                        className="fwEbold text-uppercase d-block mb-1"
                      >
                        E-mail
                      </label>
                      <input
                        type="text"
                        id="email"
                        className="form-control"
                        value={this.state.currentUser === null ? undefined : this.state.email}
                      />
                    </div>
                  </fieldset>
                </form>
                <form action="javascript:void(0);" className="cartForm mb-5">
                  <div className="form-group mb-0">
                    <label
                      htmlFor="address"
                      className="fwEbold text-uppercase d-block mb-1"
                    >
                      Shipping Adress
                    </label>
                    <textarea
                      id="address"
                      className="form-control"
                      value={this.state.currentUser === null ? undefined : this.state.address}
                    ></textarea>
                  </div>
                </form>
                <form action="javascript:void(0);" className="cartForm mb-5">
                  <div className="form-group mb-0">
                    <label
                      htmlFor="note"
                      className="fwEbold text-uppercase d-block mb-1"
                    >
                      Additional Instructions
                    </label>
                    <textarea
                      id="note"
                      className="form-control"
                    ></textarea>
                  </div>
                </form>
              </div>
              <br></br>
              <div className="col-12 col-md-6">
                <div className="d-flex justify-content-between">
                  <strong className="txt fwEbold text-uppercase mb-1">
                    Subtotal
                  </strong>
                  <strong className="price fwEbold text-uppercase mb-1"> Rs. {this.props.cartTotal} </strong>
                </div>
                <div>
                  <div>
                    <Link
                      to="/order"
                      className="btn btnTheme w-100 fwEbold text-center text-white md-round py-3 px-4 py-md-3 px-md-4"
                      onClick={() => this.placeOrder()}
                    >
                      Place Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Cart;