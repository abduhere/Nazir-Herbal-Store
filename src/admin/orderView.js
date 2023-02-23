import React,{ Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";

class adminOrderView extends Component  {

    render() {
        const order = this.props.location.state
		return (
			<div>
                {/* {{/*<!-- Wrapper Start -->*/} 
                <div className="wrapper">

                    <Header />
                    
                    <Sidebar />

					{/*<!-- Main Container Start -->*/}
                    
                    <main className="main--container">
                        {/* <!-- Page Header Start --> */}
                        <section className="page--header">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-6">
                                        {/* <!-- Page Title Start --> */}
                                        <h2 className="page--title h5">Orders</h2>
                                        {/* <!-- Page Title End --> */}
                                        
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><span><Link to ="/admin/home">Home</Link></span></li>
                                            <li className="breadcrumb-item"><span><Link to = "/admin/orders">Orders</Link></span></li>
                                            <li className="breadcrumb-item active"><span>Order View</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* <!-- Page Header End --> */}

                        {/* <!-- Main Content Start --> */}
                        <section className="main--content">
                            <div className="panel">
                                {/* <!-- Records Header Start --> */}
                                <div className="records--header">
                                    <div className="title fa-shopping-bag">
                                        <h3 className="h3"> Order View </h3>
                                    </div>
                                </div>
                                {/* <!-- Records Header End --> */}
                            </div>
                            
                            <div className="panel">

                                {/* <!-- View Order Start --> */}
                                <div className="records--body">
                                    <div className="title">
                                        <h6 className="h6">Order #{order[1]+1} <span className="text-lightergray"> - {order[0].date}</span></h6>
                                    </div>

                                    {/* <!-- Tabs Nav Start --> */}
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a href="#tab01" data-toggle="tab" className="nav-link active">Order Details</a>
                                        </li>
                                    </ul>
                                    {/* <!-- Tabs Nav End --> */}

                                    {/* <!-- Tab Content Start --> */}
                                    <div className="tab-content">
                                        {/* <!-- Tab Pane Start --> */}
                                        <div className="tab-pane fade show active" id="tab01">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h4 className="subtitle">Order Information</h4>

                                                    <table className="table table-simple">
                                                        <tbody>
                                                            <tr>
                                                                <td>Customer Name:</td>
                                                                <th>{order[0].name}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Order Number:</td>
                                                                <th>{order[1]+1}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Date:</td>
                                                                <th>{order[0].date}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Total Amount:</td>
                                                                <th>PKR {order[0].total}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Number of Items:</td>
                                                                <th>{typeof(order[0].items) === "undefined" ? 0 : order[0].items.length}</th>
                                                            </tr>
                                                            {/*<tr>
                                                                <td>Client History:</td>
                                                                <th>4 Past Orders</th>
                                                            </tr>*/}
                                                            {/*<tr>
                                                                <td>Payment Method:</td>
                                                                <th>Cash on delivery</th>
                                                            </tr>*/}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="col-md-6">
                                                    <h4 className="subtitle">Other Information</h4>

                                                    <table className="table table-simple">
                                                        <tbody>
                                                            <tr>
                                                                <td>Ship To:</td>
                                                                <th>{order[0].name}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Destination:</td>
                                                                <th>{order[0].address}</th>
                                                            </tr>
                                                            {/*<tr>
                                                                <td>Delivery Date:</td>
                                                                <th></th>
                                                            </tr>*/}
                                                            <tr>
                                                                <td>Shipping Method:</td>
                                                                <th>TCS</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Shipment Status:</td>
                                                                <th>{order[0].status}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone Number:</td>
                                                                <th>{order[0].contact}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Email:</td>
                                                                <th>{order[0].email}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Notes:</td>
                                                                <th>{order[0].comments}</th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- Tab Pane End --> */}
                                    </div>
                                    {/* <!-- Tab Content End --> */}
                                </div>
                                {/* <!-- View Order End --> */}
                            </div>
                        </section>
                        {/* <!-- Main Content End --> */}

                        {/* <!-- Main Footer Start --> */}
                        <footer className="main--footer main--footer-transparent">
                            <p>2021 &copy; <a href="#">Nazir Herbal Store</a>. All Rights Reserved.</p>
                        </footer>
                        {/* <!-- Main Footer End --> */}
                    </main>

                    {/* {{/*<!-- Main Container End -->*/} 
                </div>
                {/* {{/*<!-- Wrapper End -->*/} 

				{/* < Footer /> */}
			</div>
		);
    }
}

export default adminOrderView;