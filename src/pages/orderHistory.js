import React,{ Component } from "react";
import { NavLink, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import fireDatabase from "../firebase";

class orderHistory extends Component {
    constructor () {
        super();
        this.state = {
            orderList: [],
            orderId: []
        };
    }

    componentDidMount = () => {
        var currentUser = fireDatabase.auth().currentUser;
        var orderId = [];
        var orderList = [];
        if (currentUser !== null) {
            var ref = fireDatabase.database().ref("users/").child(currentUser.uid).child("orders");
            ref.on("value", snapshot => {
                snapshot.forEach(value => {
                    orderId.push(value.val());
                });
            });

            ref = fireDatabase.database().ref("orders/");
            ref.on("value", snapshot => {
                snapshot.forEach(value => {
                    if(orderId.includes(value.key)) {
                        orderList.push(value);
                    }
                });

                this.setState({
                    orderList: orderList
                });
            });
        }
    }

    trackOrder = (id) => {
        localStorage.setItem("nhsOrderId", id);
    }

    render() {
		return (
			<div>
				< Header shoppingCart = {this.props.shoppingCart} />
                <main>
                    {/* <!-- introBannerHolder --> */}
                    <section className="introBannerHolder d-flex w-100 bgCover" style={{backgroundImage: "url(./../assets/images/1263x300.png)"}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
                                    <h1 className="headingIV fwEbold playfair mb-4">Order History</h1>
                                    <ul className="list-unstyled breadCrumbs d-flex justify-content-center">
                                        <li className="mr-sm-2 mr-1"><Link to="/"> Home </Link></li>
                                        <li className="mr-sm-2 mr-1">/</li>
                                        <li className="active"> Order History </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="cartHolder container pt-xl-21 pb-xl-24 py-lg-20 py-md-16 py-10">
                        <h1 className="headingIV playfair fwEblod mb-7 pb-10">Order History</h1>
                        <div className="row">
                            {/* <!-- table-responsive --> */}
                            <div className="col-12 table-responsive mb-xl-22 mb-lg-10 mb-md-16 mb-10">
                                {/* <!-- cartTable --> */}
                                <table className="table cartTable">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-uppercase fwEbold border-top-0 pr-30">Order Number</th>
                                            <th scope="col" className="text-uppercase fwEbold border-top-0">Subtotal</th>
                                            <th scope="col" className="text-uppercase fwEbold border-top-0">Date</th>
                                            <th scope="col" className="text-uppercase fwEbold border-top-0">Order Status</th>
                                            <th scope="col" className="text-uppercase fwEbold border-top-0"></th>
                                            <th scope="col" className="text-uppercase fwEbold border-top-0"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.orderList.map((value, index) => {
                                                return (
                                                    <tr className="align-items-center" key={index}>
                                                        <td className="fwEbold border-top-0 border-bottom px-0 py-6">
                                                            <div style={{width: 100}}>
                                                            <span className="title pl-2"><a href="shop-detail.html"> {value.key} </a></span>
                                                            </div>
                                                        </td>
                                                        <td className="fwEbold border-top-0 border-bottom px-0 py-6"> Rs. {value.val().total} </td>
                                                        <td className="fwEbold border-top-0 border-bottom px-0 py-6"> {value.val().date} </td>
                                                        <td className="fwEbold border-top-0 border-bottom px-0 py-6"> {value.val().status} </td>
                                                        <td className="fwEbold border-top-0 border-bottom px-0 py-6"><Link to="/orderDetail" className="btn btnCart fwEbold text-center md-round py-3 px-4 py-md-3 px-md-4" onClick = {() => this.trackOrder(value.key)}> Order Details </Link></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}

export default orderHistory;