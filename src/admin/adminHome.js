import React,{ Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";

class adminHome extends Component  {
	constructor() {
		super();
		this.state = {
			orders: [],
            orderId: [],
            i : 0,
			feedback: [],
            users: [],
            shipped: 0
		};
	};

	componentDidMount() {

		var ref = fireDatabase.database().ref("orders/");
		var reffeedback = fireDatabase.database().ref("feedback/");
        var refusers = fireDatabase.database().ref("users/");

        var order = [];
        ref.limitToFirst(5).on("value", snapshot => { 
            var id = []
            snapshot.forEach ((value) => {
                order.push(value.val());
                id.push(value.key)

            });

            this.setState({
                orders: order,
                orderId: id
            })
        });
		
        reffeedback.on("value", snapshot => {
            var featuredList = []
            snapshot.forEach(value => {
                featuredList.push(value.val())
            });
            this.setState({
                feedback: featuredList
            });
        });

        refusers.on("value", snapshot => {
            var fList = []
            snapshot.forEach(value => {
                fList.push(value.val())
            });
            this.setState({
                users: fList
            });
        });

        var x = 0
        order.forEach(value => {
            if(value.status === "Shipped")
            {
                x = x + 1
            }
            this.setState({
                shipped: x
            })
        })

	}
    

    render() {
		return (
			<div>
                {/* <!-- Wrapper Start --> */}
                <div className="wrapper">

                    <Header />
                    
                    <Sidebar />

                    {/* <!-- Main Container Start --> */}
                    <main className="main--container">
                        {/* {<!-- Page Header Start --> */}
                        <section className="page--header">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-6">
                                        {/* {<!-- Page Title Start --> */}
                                        <h2 className="page--title h5">Nazir Herbal Store</h2>
                                        {/* {<!-- Page Title End --> */}

                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item active"><span>Home</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* {<!-- Page Header End --> */}

                        {/* {<!-- Main Content Start --> */}
                        <section className="main--content">
                            <div className="row gutter-20">
                                <div className="col-md-4">
                                    <div className="panel">
                                        {/* {<!-- Mini Stats Panel Start --> */}
                                        <div className="miniStats--panel">
                                            <div className="miniStats--header bg-darker">
                                                <p className="miniStats--chart" data-trigger="sparkline" data-type="bar" data-width="4" data-height="30" data-color="#1abfc3">5,6,9,4,9,5,3,5,9,15,3,2,2,3,9,11,9,7,20,9,7,6</p>

                                                <p className="miniStats--label text-white bg-blue">
                                                    <i className="fa fa-level-up-alt"></i>
                                                    <span>10%</span>
                                                </p>
                                            </div>

                                            <div className="miniStats--body">
                                                <i className="miniStats--icon fa fa-user text-blue"></i>

                                                <p className="miniStats--caption text-blue">Total</p>
                                                <h3 className="miniStats--title h4"> Members</h3>
                                                <p className="miniStats--num text-blue">{this.state.users.length}</p>
                                            </div>
                                        </div>
                                        {/* {<!-- Mini Stats Panel End --> */}
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="panel">
                                        {/* {<!-- Mini Stats Panel Start --> */}
                                        <div className="miniStats--panel">
                                            <div className="miniStats--header bg-darker">
                                                <p className="miniStats--chart" data-trigger="sparkline" data-type="bar" data-width="4" data-height="30" data-color="#cd9b06">2,2,3,9,11,9,7,20,9,7,6,5,6,9,4,9,5,3,5,9,15,3</p>

                                                <p className="miniStats--label text-white bg-golden">
                                                    <i className="fa fa-level-down-alt"></i>
                                                    <span>10%</span>
                                                </p>
                                            </div>

                                            <div className="miniStats--body">
                                                <i className="miniStats--icon fa fa-ticket-alt text-golden"></i>

                                                <p className="miniStats--caption text-golden">Total</p>
                                                <h3 className="miniStats--title h4">Orders Placed</h3>
                                                <p className="miniStats--num text-golden">{this.state.orders.length}</p>
                                            </div>
                                        </div>
                                        {/* {<!-- Mini Stats Panel End --> */}
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="panel">
                                        {/* {<!-- Mini Stats Panel Start --> */}
                                        <div className="miniStats--panel">
                                            <div className="miniStats--header bg-darker">
                                                <p className="miniStats--chart" data-trigger="sparkline" data-type="bar" data-width="4" data-height="30" data-color="#006b3c">2,2,3,9,11,9,7,20,9,7,6,5,6,9,4,9,5,3,5,9,15,3</p>

                                                <p className="miniStats--label text-white bg-green">
                                                    <i className="fa fa-level-up-alt"></i>
                                                    <span>10%</span>
                                                </p>
                                            </div>

                                            <div className="miniStats--body">
                                                <i className="miniStats--icon fa fa-rocket text-green"></i>

                                                <p className="miniStats--caption text-green">Total</p>
                                                <h3 className="miniStats--title h4">Orders Shipped</h3>
                                                <p className="miniStats--num text-green">{this.state.shipped}</p>
                                            </div>
                                        </div>
                                        {/* {<!-- Mini Stats Panel End --> */}
                                    </div>
                                </div>

                                <div className="col-xl-9">
                                    <div className="panel">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">
                                                <select name="filter" data-trigger="selectmenu" data-minimum-results-for-search="-1">
                                                    <option value="top-search">Recent Orders</option>
                                                    <option value="average-search">Latest Orders</option>
                                                </select>
                                            </h3>
                                        </div>

                                        <div className="panel-body">
                                            <div className="table-responsive">
                                                <table className="table style--2">
                                                    <thead>
                                                        <tr>
                                                            <th>Order No</th>
                                                            <th>Order ID</th>
                                                            <th>Customer Name</th>
                                                            <th>Price</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* {<!-- Table Row Start --> */}
                                                        {
                                                        this.state.orders.map((value, index) => 
                                                        {
                                                            return(
                                                            <tr>
                                                                <td>
                                                                {this.state.i = this.state.i + 1}
                                                                </td>
                                                                <td><Link to= {{pathname: "/admin/orderView" , state: [value, index]}} className="btn-link">{this.state.orderId[this.state.i-1]}</Link></td>
                                                                <td><Link to= {{pathname: "/admin/orderView" , state: [value, index]}} className="btn-link">{value.name}</Link></td>
                                                                <td>{value.total}</td>
                                                                <td>
                                                                    <span className={value.status === "Approved" ? "label label-success" : "label label-warning"}>{value.status}</span>
                                                                </td>
                                                            </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6">
                                    <div className="panel">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Feedback</h3>
                                        </div>

                                        <div className="comments-panel">
                                            <ul>
                                            {    
                                                this.state.feedback.map((value, index)=>
                                                    {
                                                        return (
                                                        <li>
                                                            {/* <div className="img">
                                                                <img src="assets/img/avatars/profilePicture.png" alt="" className="rounded-circle"/>
                                                            </div> */}

                                                            <div className="info">
                                                                <h3 className="h6">{value.name}</h3>

                                                                <p>{value.feedback}</p>

                                                                <div className="action">
                                                                    {/* <span className="btn btn-sm btn-info">{value.status}</span> */}
                                                                    <span className={value.status === "Visible" ? "label label-success" : "label label-warning"}>{value.status}</span>
                                                                    {/* <a href="#" className="btn btn-sm btn-info">Delete</a> */}
                                                                </div>
                                                            </div>
                                                        </li>
                                                        )
                                                    })
                                            }
                                            </ul>

                                            <div className="nav">
                                                {/*<a href="#" className="next btn-link">Older Comments <i className="fa fa-angle-double-right"></i></a>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* {<!-- Main Content End --> */}

                        {/* {<!-- Main Footer Start --> */}
                        <footer className="main--footer main--footer-transparent">
                            <p>2021 &copy; <a href="#">Nazir Herbal Store</a>. All Rights Reserved.</p>
                        </footer>
                        {/* {<!-- Main Footer End --> */}
                    </main>
                    {/* {<!-- Main Container End --> */}
                </div>
                {/* {<!-- Wrapper End --> */}

				{/* < Footer /> */}
			</div>
		);
    }
}

export default adminHome;