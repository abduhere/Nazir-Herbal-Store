import React,{ Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";

class approve_orders extends Component  {
	constructor() {
		super();
		this.state = {
            orderId: "",
            order: []
		};
	}

    handleDonotApprove = () => {
        console.log("here")
        console.log(this.state.orderId)
        fireDatabase.database().ref("orders/").child(this.props.location.state[1]).child("status").set("Rejected");
    }

    render() {
        const order = this.props.location.state
        this.state.order = this.props.location.state[0]
        this.state.orderId = order[1]
		return (
			<div>
                {/*{/*<!-- Wrapper Start -->*/}
                <div classNameNameName="wrapper">
                    <Header />
                    <Sidebar />
					{/* {/* <!-- Main Container Start --> */}
                    <main className="main--container">
                        {/*<!-- Page Header Start -->*/}
                        <section className="page--header">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-6">
                                        {/*<!-- Page Title Start -->*/}
                                        <h2 className="page--title h5">Order Approval</h2>
                                        {/*<!-- Page Title End -->*/}
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><span>Home</span></li>
                                            <li className="breadcrumb-item"><span><Link to ="/admin/orders">Orders</Link></span></li>
                                            <li className="breadcrumb-item active"><span>Order Approval</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/*<!-- Page Header End -->*/}
                        {/*<!-- Main Content Start -->*/}
                        <section className="main--content">
                            <div className="panel">
                                {/*<!-- View Order Start -->*/}
                                <div className="records--body">
                                    <div className="title">
                                        <h6 className="h6">Order #{order[1]}<span className="text-lightergray"> - {order[0].date}</span></h6>
                                    </div>
                                    {/*<!-- Tabs Nav Start -->*/}
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a href="#tab01" data-toggle="tab" className="nav-link active">Order Details</a>
                                        </li>
                                    </ul>
                                    {/*<!-- Tabs Nav End -->*/}
                                    {/*<!-- Tab Content Start -->*/}
                                    <div className="tab-content">
                                        {/*<!-- Tab Pane Start -->*/}
                                        <div className="tab-pane fade show active" id="tab01">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h4 className="subtitle">Order Information</h4>
                                                    <table className="table table-simple">
                                                        <tbody>
                                                            {/* <tr>Found Total {this.state.featured.length} Orders</tr> */}
                                                            <tr>
                                                                <td>Customer Name:</td>
                                                                <th>{this.state.order.name}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Order Number:</td>
                                                                <th>{this.state.orderId}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Date:</td>
                                                                <th>{this.state.order.date}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Total Amount:</td>
                                                                <th>Rs. {this.state.order.total}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Payment Method:</td>
                                                                <th>Cash on delivery</th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="col-md-6">
                                                    <h4 className="subtitle">Other Information</h4>

                                                    <table className="table table-simple">
                                                        <tbody>
                                                            <tr>
                                                                <td>Ship To:</td>
                                                                <th>{this.state.order.name}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Destination:</td>
                                                                <th>{this.state.order.address}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Order Date:</td>
                                                                <th>{this.state.order.date}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Shipping Method:</td>
                                                                <th>TCS</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Order Status:</td>
                                                                <th>{this.state.order.status}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone Number:</td>
                                                                <th>{this.state.order.contact}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Email:</td>
                                                                <th>{this.state.order.email}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Notes:</td>
                                                                <th>{this.state.order.comments}</th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className="invoice--footer">
                                                <div className="invoice--payment">
                                                    <p><strong>Payment Method:</strong> Cash On Delivery </p>
                                                    {/* <p><strong>Card Type:</strong> Mastercard</p>
                                                    <p><strong>Number Verification:</strong> 598746325950</p> */}
                                                </div>
                    
                                                <div className="invoice--actions">
                                                    {/*<!-- <a href="#" className="btn btn-rounded btn-outline-secondary">Save PDF</a> -->*/}
                                                    <Link to={{pathname: "/admin/orders"}} className="btn btn-rounded btn-warning" onClick={() => this.handleDonotApprove()}>DO NOT APPROVE</Link>
                                                    <Link to={{pathname: "/admin/invoice", state: this.state.orderId}} className="btn btn-rounded btn-info">Approve</Link>
                                                </div>
                                            </div>

                                        </div>
                                        {/*<!-- Tab Pane End -->*/}
                                    </div>
                                    {/*<!-- Tab Content End -->*/}
                                </div>
                                {/*<!-- View Order End -->*/}
                            </div>
                        </section>
                        {/*<!-- Main Content End -->*/}

                        {/*<!-- Main Footer Start -->*/}
                        <footer className="main--footer main--footer-transparent">
                            <p>2021 &copy; <a href="#">Nazir Herbal Store</a>. All Rights Reserved.</p>
                        </footer>
                        {/*<!-- Main Footer End -->*/}
                    </main>
                    {/* {{/*{/*{/*<!-- Main Container End -->*/}
                </div>
                {/* {{/*{/*{/*<!-- Wrapper End -->*/}

				{/* < Footer /> */}
			</div>
		);
    }
}

export default approve_orders;