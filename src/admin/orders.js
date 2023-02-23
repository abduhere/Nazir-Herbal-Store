import React,{ Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";
import Modal from 'react-modal'
Modal.setAppElement('#root')

class adminOrders extends Component  {
	constructor() {
		super();
		this.state = {
			orders: [],
            orderId: [],
            i : 0, 
            showModal: false,
            showModal2: false,
            tobeDel: [],
            tobeUpd: [],
            searchTerm: "",
            value: "",
            num: 0
		};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
	};

    handleChange(event) {
        this.setState({ value: event.target.value });
      }
    
      handleSubmit(event) {
        event.preventDefault();
        this.setState({
          searchTerm: this.state.value
        })
    }

	componentDidMount = () => {
        var ref = fireDatabase.database().ref("orders");
        ref.on("value", snapshot => { 
            var order = [];
            var id = []
            snapshot.forEach ((value) => {
                order.push(value.val());
                id.push(value.key)

            });
            this.setState({
                orders: order,
                orderId: id
            });
        });
	}

    handleDelete(v)
    {
        this.setState({
          showModal: true,
          tobeDel: v
          })
        
    }

    handleApprove(v)
    {
        if(v.status === `Approved`)
        {
            this.setState({
                showModal2: true,
                tobeUpd: v
            })
        }

    }

    handleApprove2(v)
    {
        var ref = fireDatabase.database().ref("orders");
        this.setState({
            showModal2: false,
        })
        ref.on("value", function(snapshot){
            snapshot.forEach(value => {
                if(JSON.stringify(value.val()) === JSON.stringify(v))
                {
                    value.ref.update({
                        "status": "Shipped"
                    })
                }
            })
        })
        this.setState({
            tobeDel: []
        })
    }

    handleDelete2(v)
    {
      var ref = fireDatabase.database().ref("orders");
      this.setState({
        showModal: false,
      })
      ref.on("value", function(snapshot){
          snapshot.forEach(value => {
              if(JSON.stringify(value.val()) === JSON.stringify(v))
              {
                value.ref.remove()
              }
          })
      })
      this.setState({
        tobeDel: []
      })
        
    }

    render() { 
        this.state.i = 0
		return (
			<div>
                {/* {{/*<!-- Wrapper Start -->*/} 
                <div className="wrapper">
                <Modal isOpen={this.state.showModal} style={{content:{position: 'absolute',
					inset: '40px',
					border: '1px solid rgb(204, 204, 204)',
					background: 'rgb(255, 255, 255)',
					overflow: 'auto',
					borderRadius: '12px',
					outline: 'none',
					padding: '10px',
					height: '50px',
					width: '100px',
					marginLeft: 'auto',
					marginRight: 'auto',
					marginTop: 'auto',
					marginBottom: 'auto'}}
					
				}>
					<div>
						<section className="modal-main">
							<h3 className="headingVII fwEbold text-uppercase mb-5">Are you sure you want to delete?</h3>
							<div className='modal-Button'><button
								onClick={() => this.handleDelete2(this.state.tobeDel)}
								className="btn btnTheme btnShop fwEbold text-white md-round"
								>
								<i className="fas ml-2">
									{" "}
									Yes
								</i>
								</button>
                <button
								onClick={() => this.setState({showModal: false})}
								className="btn btnTheme btnShop fwEbold text-white md-round"
								>
								<i className="fas ml-2">
									{" "}
									No!
								</i>
								</button>
                </div>
						</section>
    				</div>
				</Modal>
                <Modal isOpen={this.state.showModal2} style={{content:{position: 'absolute',
					inset: '40px',
					border: '1px solid rgb(204, 204, 204)',
					background: 'rgb(255, 255, 255)',
					overflow: 'auto',
					borderRadius: '12px',
					outline: 'none',
					padding: '10px',
					height: '50px',
					width: '100px',
					marginLeft: 'auto',
					marginRight: 'auto',
					marginTop: 'auto',
					marginBottom: 'auto'}}
					
				}>
					<div>
						<section className="modal-main">
							<h3 className="headingVII fwEbold text-uppercase mb-5">The order has already been approved. You can update the shipping status.</h3>
							<div className='modal-Button'><button
								onClick={() => this.handleApprove2(this.state.tobeUpd)}
								className="btn btnTheme btnShop fwEbold text-white md-round"
								>
								<i className="fas ml-2">
									{" "}
									Shipped
								</i>
								</button>
                <button
								onClick={() => this.setState({showModal2: false})}
								className="btn btnTheme btnShop fwEbold text-white md-round"
								>
								<i className="fas ml-2">
									{" "}
									Not Shipped
								</i>
								</button>
                </div>
						</section>
    				</div>
				</Modal>
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
                                            <li className="breadcrumb-item"><span><Link to = "/admin/home">Home</Link></span></li>
                                            <li className="breadcrumb-item active"><span>Orders</span></li>
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
                                        <h3 className="h3"> Orders </h3>
                                        <p>Found Total {this.state.orders.length} Orders</p>
                                    </div>

                                    <div className="actions">
                                        <form action="#" className="search" onSubmit ={this.handleSubmit}>
                                            <input type="text" className="form-control" placeholder="Order ID or Customer Name..." onChange ={this.handleChange}/>
                                            <button type="submit" className="btn btn-rounded"><i className="fa fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                                {/* <!-- Records Header End --> */}
                            </div>

                            <div className="panel">
                                {/* <!-- Records List Start --> */}
                                <div className="records--list" data-title="Orders Listing">
                                    <table id="recordsListView">
                                        <thead>
                                            <tr>
                                                <th>Order No</th>
                                                <th>Order ID</th>
                                                <th>Purchased On</th>
                                                <th>Customer Name</th>
                                                <th>Ship To</th>
                                                <th>Total Price</th>
                                                <th>Comments</th>
                                                <th>Status</th>
                                                <th className="not-sortable">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr></tr>
                                            {
                                                this.state.orders
                                                    .filter(value => {
                                                      console.log(this.state.searchTerm);
                                                      if (this.state.searchTerm === "") {
                                                        return value;
                                                      } else if (
                                                        value.name
                                                          .toLowerCase()
                                                          .includes(this.state.searchTerm.toLowerCase())
                                                      ) {
                                                        return value;
                                                      }
                                                    }).map((value, index) => 
                                                    {
                                                    return(
                                                    <tr>
                                                        <td>
                                                        {this.state.i = this.state.i + 1}
                                                        </td>
                                                        <td><Link to= {{pathname: "/admin/orderView" , state: [value, index]}} className="btn-link">{this.state.orderId[this.state.i-1]}</Link></td>
                                                        <td>{value.date}</td>
                                                        <td>{value.name}</td>
                                                        <td>{value.address}</td>
                                                        <td>{value.total}</td>
                                                        <td>{value.comments}</td>
                                                        <td>
                                                            <span className={value.status === "Approved" ? "label label-success" : "label label-warning"}>{value.status}</span>
                                                        </td>
                                                        <td>
                                                            <div className="dropleft">
                                                                <a href="#" className="btn-link" data-toggle="dropdown"><i className="fa fa-ellipsis-v"></i></a>
                                                                <div className="dropdown-menu">
                                                                    <Link to={{pathname: (value.status === "Shipped" || value.status === "Approved" || value.status === "Rejected") ? "/admin/orders" : "/admin/approve" , state: [value, this.state.orderId[this.state.i-1]]}} className="dropdown-item" onClick={()=>this.handleApprove(value)}>Approve</Link>
                                                                    <Link to="/admin/orders" className="dropdown-item" onClick ={()=>this.handleDelete(value)} > Delete </Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                       {/* <tbody>
                                            <tr>
                                                <td>01</td>
                                                <td>
                                                    <a href="#" className="btn-link">#315321</a>
                                                </td>
                                                <td>2017/04/25 02:07:59</td>
                                                <td>
                                                    <a href="#" className="btn-link">Ahmed Qazi</a>
                                                </td>
                                                <td>Ahmed Qazi</td>
                                                <td>PKR 12.00</td>
                                                <td>Cash on delivery</td>
                                                <td>
                                                    <span className="label label-success">Approved</span>
                                                </td>
                                                <td>
                                                    <div className="dropleft">
                                                        <a href="#" className="btn-link" data-toggle="dropdown"><i className="fa fa-ellipsis-v"></i></a>

                                                        <div className="dropdown-menu">
                                                            <a href="#" className="dropdown-item">Edit</a>
                                                            <a href="#" className="dropdown-item">Delete</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>02</td>
                                                <td>
                                                    <a href="#" className="btn-link">#315321</a>
                                                </td>
                                                <td>2017/04/25 02:07:59</td>
                                                <td>
                                                    <a href="#" className="btn-link">Hamd Jalil</a>
                                                </td>
                                                <td>Abdullah Saleem</td>
                                                <td>PKR 12.00</td>
                                                <td>Cash on delivery</td>
                                                <td>
                                                    <span className="label label-warning">Pending</span>
                                                </td>
                                                <td>
                                                    <div className="dropleft">
                                                        <a href="#" className="btn-link" data-toggle="dropdown"><i className="fa fa-ellipsis-v"></i></a>

                                                        <div className="dropdown-menu">
                                                            <a href="#" className="dropdown-item">Edit</a>
                                                            <a href="#" className="dropdown-item">Delete</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>03</td>
                                                <td>
                                                    <a href="#" className="btn-link">#315321</a>
                                                </td>
                                                <td>2017/04/25 02:07:59</td>
                                                <td>
                                                    <a href="#" className="btn-link">Abdullah Saleem</a>
                                                </td>
                                                <td>Abdullah Saleem</td>
                                                <td>PKR 120.00</td>
                                                <td>Credit Card</td>
                                                <td>
                                                    <span className="label label-danger">Deleted</span>
                                                </td>
                                                <td>
                                                    <div className="dropleft">
                                                        <a href="#" className="btn-link" data-toggle="dropdown"><i className="fa fa-ellipsis-v"></i></a>

                                                        <div className="dropdown-menu">
                                                            <a href="#" className="dropdown-item">Edit</a>
                                                            <a href="#" className="dropdown-item">Delete</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>*/}
                                    </table>
                                </div>
                                {/* <!-- Records List End --> */}
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

export default adminOrders;