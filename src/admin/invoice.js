import React,{ Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";

class invoice extends Component  {
	constructor() {
		super();
		this.state = {
            orderId: "",
            order: [],
            date: "",
            items: [],
		};

        this.total = 0
	}

	componentDidMount() {
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var orderId = this.props.location.state
        fireDatabase.database().ref("orders").child(orderId).on("value", snapshot => {
            this.setState({
                orderId: orderId,
                order: snapshot.val(),
                date: date,
                items: snapshot.val().items
            });
        });
	}

    handleApprove = () => {
        fireDatabase.database().ref("orders/").child(this.state.orderId).child("status").set("Approved");
    }

    handleDonotApprove = () => {
        console.log("here")
        console.log(this.state.orderId)
        fireDatabase.database().ref("orders/").child(this.state.orderId).child("status").set("Rejected");
    }
    render() {
		return (
			<div>
                {/* {{/*<!-- Wrapper Start -->*/} 
                <div className="wrapper">
                    <Header />
                    <Sidebar />
					{/*<!-- Main Container Start -->*/}
                    {/* <!-- Main Container Start --> */}
                        <main className="main--container">
                            {/* <!-- Page Header Start --> */}
                            <section className="page--header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            {/* <!-- Page Title Start --> */}
                                            <h2 className="page--title h5">Invoice</h2>
                                            {/* <!-- Page Title End --> */}
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item"><Link to="/admin/home">Home</Link></li>
                                                <li className="breadcrumb-item"><span><Link to = "/admin/orders">Orders</Link></span></li>
                                                <li className="breadcrumb-item active"><span>Invoice</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* <!-- Page Header End --> */}
                            {/* <!-- Main Content Start --> */}
                            <section className="main--content">
                                <div className="panel">
                                    {/* <!-- Invoice Start --> */}
                                    <div className="invoice">
                                        <div className="invoice--header">
                                            {/* <!-- <div className="invoice--logo"> --> */}
                                                {/* <!-- <img src="assets/img/invoice/logo.png" alt=""> --> */}
                                            {/* <!-- </div> --> */}
                                            <div className="invoice--address">
                                                <h5 className="h5">Address</h5>
                                                <p> {this.state.order.address} </p>
                                            </div>
                                        </div>
                                        <div className="invoice--billing">
                                            <div className="invoice--address">
                                                <h3 className="h3"><span>To: {this.state.order.name}</span></h3>
                                                <p>Phone: {this.state.order.contact}</p>
                                            </div>
                                            <div className="invoice--info">
                                                <h5 className="h5"><span>Invoice:</span> {this.state.orderId} </h5>
                                                <p>Invoice Date: <strong> {this.state.date} </strong></p>
                                            </div>
                                        </div>
                                        <div className="invoice--order">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Description</th>
                                                        <th>Quantity</th>
                                                        <th>Unit Price (Rs)</th>
                                                        <th> Discount (Rs)</th>
                                                        <th>Total (Rs)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.items.map((value) => {
                                                            this.total = (this.total + value.price - value.discount) * value.quantity
                                                            return (
                                                                <tr>
                                                                    <td>{value.title}</td>
                                                                    <td>{value.summary}</td>
                                                                    <td>{value.quantity}</td>
                                                                    <td>{value.price}</td>
                                                                    <td>{value.discount}</td>
                                                                    <td>{(value.price - value.discount) * value.quantity}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    <tr>
                                                        <td colspan="4"><strong>Total</strong></td>
                                                        <td><strong>{this.total}</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="invoice--footer">
                                            <div className="invoice--payment">
                                                <p><strong>Payment Method:</strong> Cash On Delivery </p>
                                                {/* <p><strong>Card Type:</strong> Mastercard</p>
                                                <p><strong>Number Verification:</strong> 598746325950</p> */}
                                            </div>
                                            <div className="invoice--actions">
                                            <Link to={{pathname: "/admin/orders"}} className="btn btn-rounded btn-warning" onClick={() => this.handleDonotApprove()}>DO NOT APPROVE</Link>
                                                <Link to="/admin/orders" className="btn btn-rounded btn-info" onClick={() => this.handleApprove()}> Approve </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Invoice End --> */}
                                </div>
                            </section>
                            {/* <!-- Main Content End --> */}
                            {/* <!-- Main Footer Start --> */}
                            <footer className="main--footer main--footer-light">
                                <p>Copyright &copy; <a href="#">Nazir Herbal Store</a>. All Rights Reserved.</p>
                            </footer>
                            {/* <!-- Main Footer End --> */}
                        </main>
                        {/* <!-- Main Container End --> */}
                    {/* {{/*<!-- Main Container End -->*/} 
                </div>
                {/* {{/*<!-- Wrapper End -->*/} 
				{/* < Footer /> */}
			</div>
		);
    }
}

export default invoice;