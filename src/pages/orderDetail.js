import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import fireDatabase from "../firebase";

class orderHistory extends Component {
  constructor() {
    super();
    this.state = {
      order: "",
      itemList: [],
      authUser: null,
      orderStatus: "",
      orderId: localStorage.getItem("nhsOrderId"),
      validId: false
    };
  }

  componentDidMount = () => {
    console.log(this.state.orderId);
    fireDatabase.database().ref("orders/").on("value", snapshot => {
      var orderIdList = [];

      snapshot.forEach((value) => {
        orderIdList.push(value.key);
      });
      console.log(orderIdList);

      if (orderIdList.includes(this.state.orderId) === true) {
        console.log("HERE");
        var itemList = [];
        var ref = fireDatabase
          .database()
          .ref("orders/")
          .child(this.state.orderId)
          .child("items");
        ref.on("value", snapshot => {
          snapshot.forEach(value => {
            itemList.push(value.val());
          });
        });

        var order;
        ref = fireDatabase
          .database()
          .ref("orders/")
          .child(this.state.orderId);
        ref.on("value", snapshot => {
          order = snapshot.val();

          this.setState({
            itemList: itemList,
            order: order,
            validId: true
          });
        });
      }
    });
  }

  render() {
    console.log(this.state.order.status)
    var bar;
    if (this.state.order.status === "Delivered") {
      bar = <div id="progress" style={{ width: "100%", background: "green" }}></div>

    }
    else if (this.state.order.status === "Shipped") {
      bar = <div id="progress" style={{ width: "66.66%", background: "green" }}></div>
    }
    else if (this.state.order.status === "Pending" || this.state.orderStatus === "Approved") {
      bar = <div id="progress" style={{ width: "33.33%", background: "green" }}></div>
    }
    else if (this.state.order.status === "Rejected") {
      bar = <div id="progress" style={{ width: "100%", background: "red" }}></div>
    }

    if (this.state.validId === false) {
      return (
        <div>
          <Header shoppingCart={this.props.shoppingCart} />
          <main>
            {/* <!-- introBannerHolder --> */}
            <section
              className="introBannerHolder d-flex w-100 bgCover"
              style={{ backgroundImage: "url(./../assets/images/1263x300.png)" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
                    <h1 className="headingIV fwEbold playfair mb-4">
                      Order Details
                    </h1>
                    <ul className="list-unstyled breadCrumbs d-flex justify-content-center">
                      <li className="mr-2">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="mr-2">/</li>
                      <li className="mr-2"> Order Details </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            {/* Order Tracking */}
            <section className="featureSec container-fluid overflow-hidden pt-xl-12 pt-lg-10 pt-md-80 pt-5 pb-xl-10 pb-lg-4 pb-md-2 px-xl-14 px-lg-7">
              {/* <!-- mainHeader --> */}
              <header className="col-12 mainHeader mb-7 text-center">
                <h1 className="headingIV playfair fwEblod mb-4">Invalid Order ID!</h1>
                <span className="headerBorder d-block mb-md-5 mb-3"><i class="fas fa-truck-moving"></i></span>
                <p>The order that you're trying to track does not exist in our database.</p>
                <p>Please go back to the homepage and enter a valid order ID.</p>
              </header>
            </section>
          </main>
          <Footer />
        </div>
      );
    }
    else {
      return (
        <div>
          <Header shoppingCart={this.props.shoppingCart} />
          <main>
            {/* <!-- introBannerHolder --> */}
            <section
              className="introBannerHolder d-flex w-100 bgCover"
              style={{ backgroundImage: "url(./../assets/images/1263x300.png)" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
                    <h1 className="headingIV fwEbold playfair mb-4">
                      Order Details
                    </h1>
                    <ul className="list-unstyled breadCrumbs d-flex justify-content-center">
                      <li className="mr-2">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="mr-2">/</li>
                      <li className="mr-2"> Order Details </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- cartHolder --> */}
            <div className="cartHolder container pt-xl-21 pb-xl-24 py-lg-20 py-md-16 py-10">
              <div className="row">
                {/* <!-- table-responsive --> */}
                <div className="step-row">
                  {bar}
                  <div className="step-col">
                    <small style={{ fontWeight: "bold" }}>{this.state.order.status === "Rejected" ? "" : "Order Placed"}</small>
                  </div>
                  <div className="step-col">
                    <small style={{ fontWeight: "bold" }}>{this.state.order.status === "Rejected" ? "Order Rejected" : "Order Shipped"}</small>
                  </div>
                  <div className="step-col">
                    <small style={{ fontWeight: "bold" }}>{this.state.order.status === "Rejected" ? "" : "Order Delivered"}</small>
                  </div>
                </div>
                <div className="col-12 table-responsive mb-xl-22 mb-lg-10 mb-md-16 mb-10">
                  {/* <!-- cartTable --> */}
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
                      {this.state.itemList.map((value, index) => {
                        return (
                          <tr className="align-items-center">
                            <td className="d-flex align-items-center border-top-0 border-bottom px-0 py-6">
                              <div className="imgHolder">
                                <img
                                  src={value.image}
                                  alt={value.title}
                                  className="img-fluid"
                                />
                              </div>
                              <div style={{ width: 100 }}>
                                <span className="title pl-2">
                                  {" "}
                                  {value.title}{" "}
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
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="form-group mb-0 row">
                  <label
                    for="note"
                    className="fwEbold text-uppercase d-block mb-5"
                  >
                    {" "}
                    Name: &nbsp;{" "}
                  </label>
                  <span> {this.state.order.name} </span>
                </div>
                <div className="form-group mb-0 row">
                  <label
                    for="note"
                    className="fwEbold text-uppercase d-block mb-5"
                  >
                    {" "}
                    Contact: &nbsp;{" "}
                  </label>
                  <span> {this.state.order.contact} </span>
                </div>
                <div className="form-group mb-0 row">
                  <label
                    for="note"
                    className="fwEbold text-uppercase d-block mb-5"
                  >
                    {" "}
                    Shipping Address: &nbsp;{" "}
                  </label>
                  <span> {this.state.order.address} </span>
                </div>
                <div className="form-group mb-0 row">
                  <label
                    for="note"
                    className="fwEbold text-uppercase d-block mb-5"
                  >
                    {" "}
                    Date: &nbsp;{" "}
                  </label>{" "}
                  <span> {this.state.order.date} </span>
                </div>
                <div className="form-group mb-0 row">
                  <label
                    for="note"
                    className="fwEbold text-uppercase d-block mb-5"
                  >
                    {" "}
                    Additoinal Instructions: &nbsp;{" "}
                  </label>
                  <span> {this.state.order.comments} </span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong className="txt fwEbold text-uppercase mb-1">
                    {" "}
                    Total{" "}
                  </strong>
                  <strong className="price fwEbold text-uppercase mb-1">
                    {" "}
                    Rs. {this.state.order.total}{" "}
                  </strong>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    }
  }
}

export default orderHistory;
