import React,{ Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";

class superAdminHome extends Component  {
	constructor() {
		super();
		this.state = {
			featured: [],
			cart: JSON.parse(localStorage.getItem("nhsCart") || "[]"),
			wishList: JSON.parse(localStorage.getItem("nhsWishList") || "[]")
		};
	};

	componentDidMount() {
		var ref =  fireDatabase.database().ref("products");
		ref.orderByChild("feature").equalTo("yes").limitToFirst(5).on("value", snapshot => {
			var featuredList = []
			snapshot.forEach(value => {
				featuredList.push(value.val())
			});
			this.setState({
				featured: featuredList
			});
		});
	};

	addToWishList = (item) => {
		var wishList = this.state.wishList;

		if (wishList.includes(item) === false) {
			wishList.push(item);
		};

		this.setState({
			wishList: wishList
		});

		localStorage.setItem("nhsWishList", JSON.stringify(this.state.wishList));
	};

	addToShoppingCart = (item) => {
		var counter = true;
		var cart = this.state.cart;

		cart.forEach(value => {
			if (value.title === item.title) {
				value.quantity = value.quantity + 1;
				counter = false;
			}
		})

		if (counter === true) {
			item.quantity = 1;
			cart.push(item);
		}

		this.setState({
			cart: cart
		})

		localStorage.setItem("nhsCart", JSON.stringify(this.state.cart))
	};

    render() {
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
                                        <h2 className="page--title h5">Home</h2>
                                        {/* <!-- Page Title End --> */}

                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item active"><span>Home</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* <!-- Page Header End --> */}

                        {/* <!-- Main Content Start --> */}
                        <section className="main--content">
                            <div className="row gutter-20">
                                <div className="col-md-4">
                                    <div className="panel">
                                        {/* <!-- Mini Stats Panel Start --> */}
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

                                                <p className="miniStats--caption text-blue">Monthly</p>
                                                <h3 className="miniStats--title h4">New Members</h3>
                                                <p className="miniStats--num text-blue">13,450</p>
                                            </div>
                                        </div>
                                        {/* <!-- Mini Stats Panel End --> */}
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="panel">
                                        {/* <!-- Mini Stats Panel Start --> */}
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

                                                <p className="miniStats--caption text-golden">Monthly</p>
                                                <h3 className="miniStats--title h4">Orders Placed</h3>
                                                <p className="miniStats--num text-golden">450</p>
                                            </div>
                                        </div>
                                        {/* <!-- Mini Stats Panel End --> */}
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="panel">
                                        {/* <!-- Mini Stats Panel Start --> */}
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

                                                <p className="miniStats--caption text-green">Monthly</p>
                                                <h3 className="miniStats--title h4">Orders Shipped</h3>
                                                <p className="miniStats--num text-green">3,130,300</p>
                                            </div>
                                        </div>
                                        {/* <!-- Mini Stats Panel End --> */}
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

                                            <div className="dropdown">
                                                <button type="button" className="btn-link dropdown-toggle" data-toggle="dropdown">
                                                    <i className="fa fa-ellipsis-v"></i>
                                                </button>

                                                <ul className="dropdown-menu">
                                                    <li><a href="#"><i className="fa fa-sync"></i>Update Data</a></li>
                                                    <li><a href="#"><i className="fa fa-cogs"></i>Settings</a></li>
                                                    <li><a href="#"><i className="fa fa-times"></i>Remove Panel</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="panel-body">
                                            <div className="table-responsive">
                                                <table className="table style--2">
                                                    <thead>
                                                        <tr>
                                                            <th>Product Image</th>
                                                            <th>Product ID</th>
                                                            <th>Customer Name</th>
                                                            <th>Price</th>
                                                            <th>Quantity</th>
                                                            <th>Tracking No.</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* <!-- Table Row Start --> */}
                                                        <tr>
                                                            <td><img src="assets/img/products/Product1.png" alt="" /></td>
                                                            <td>3BSD59</td>
                                                            <td><a href="#" className="btn-link">Leisure Suit Casual</a></td>
                                                            <td>$99</td>
                                                            <td>2</td>
                                                            <td><span className="text-muted">#BG6R9853lP</span></td>
                                                            <td><span className="label label-success">Paid</span></td>
                                                        </tr>
                                                        {/* <!-- Table Row End --> */}

                                                        {/* <!-- Table Row Start --> */}
                                                        <tr>
                                                            <td><img src="assets/img/products/Product2.png" alt="" /></td>
                                                            <td>3BSD59</td>
                                                            <td><a href="#" className="btn-link">Leisure Suit Casual</a></td>
                                                            <td>$99</td>
                                                            <td>2</td>
                                                            <td><span className="text-muted">#BG6R9853lP</span></td>
                                                            <td><span className="label label-warning">Due</span></td>
                                                        </tr>
                                                        {/* <!-- Table Row End --> */}

                                                        {/* <!-- Table Row Start --> */}
                                                        <tr>
                                                            <td><img src="assets/img/products/Product3.png" alt="" /></td>
                                                            <td>3BSD59</td>
                                                            <td><a href="#" className="btn-link">Leisure Suit Casual</a></td>
                                                            <td>$99</td>
                                                            <td>2</td>
                                                            <td><span className="text-muted">#BG6R9853lP</span></td>
                                                            <td><span className="label label-info">Rejected</span></td>
                                                        </tr>
                                                        {/* <!-- Table Row End --> */}
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

                                            <div className="dropdown">
                                                <button type="button" className="btn-link dropdown-toggle" data-toggle="dropdown">
                                                    <i className="fa fa-ellipsis-v"></i>
                                                </button>

                                                <ul className="dropdown-menu">
                                                    <li><a href="#"><i className="fa fa-sync"></i>Update Data</a></li>
                                                    <li><a href="#"><i className="fa fa-times"></i>Remove Panel</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="comments-panel">
                                            <ul>
                                                <li>
                                                    <div className="img">
                                                        <img src="assets/img/avatars/profilePicture.png" alt="" className="rounded-circle" />
                                                    </div>

                                                    <div className="info">
                                                        <h3 className="h6">Palwashah Ahmed</h3>

                                                        <p>Lorem ipsum dolor sit elit, sed do eiusmod tempor.</p>

                                                        <div className="action">
                                                            <span className="status text-orange">Pending</span>
                                                            <a href="#" className="btn btn-sm btn-info">Delete</a>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="img">
                                                        <img src="assets/img/avatars/profilePicture.png" alt="" className="rounded-circle" />
                                                    </div>

                                                    <div className="info">
                                                        <h3 className="h6">Armaghan Khan</h3>

                                                        <p>Lorem ipsum dolor sit elit, sed do eiusmod tempor.</p>

                                                        <div className="action">
                                                            <span className="status text-blue">Approved</span>
                                                            <a href="#" className="btn btn-sm btn-info">Delete</a>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="img">
                                                        <img src="assets/img/avatars/profilePicture.png" alt="" className="rounded-circle" />
                                                    </div>

                                                    <div className="info">
                                                        <h3 className="h6">Ghafoor Ahmed</h3>

                                                        <p>Lorem ipsum dolor sit elit, sed do eiusmod tempor.</p>

                                                        <div className="action">
                                                            <span className="status text-red">Rejected</span>
                                                            <a href="#" className="btn btn-sm btn-info">Delete</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                            <div className="nav">
                                                <a href="#" className="next btn-link">Older Comments <i className="fa fa-angle-double-right"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default superAdminHome;