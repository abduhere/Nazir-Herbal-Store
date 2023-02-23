import React,{ Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";
import Modal from 'react-modal'
Modal.setAppElement('#root')

class adminManagement extends Component  {
	constructor() {
		super();
		this.state = {
			featured: [],
            showModal: false,
            tobeDel: [],
		};
	};

	componentDidMount() {
		var ref =  fireDatabase.database().ref("admins/");
		ref.on("value", snapshot => {
			var featuredList = []
			snapshot.forEach(value => {
				featuredList.push(value.val())
			});
			this.setState({
				featured: featuredList
			});
		});
	};

    handleDelete(v)
    {
        this.setState({
            showModal: true,
            tobeDel: v
            })
        
    }

    handleDelete2(v)
    {
        var ref = fireDatabase.database().ref("admins/");
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
        });
        this.setState({
            tobeDel: []
        });
        
    }


    render() {
		return (
			<div>
                {/*<!-- Wrapper Start -->*/}
                <div classNameName="wrapper">

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

                    <Header />
                    
                    <Sidebar />
					{/*<!-- Main Container Start -->*/}
                    <main className="main--container">
            {/*<!-- Page Header Start -->*/}
            <section className="page--header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            {/*<!-- Page Title Start -->*/}
                            <h2 className="page--title h5">Admin Management</h2>
                            {/*<!-- Page Title End -->*/}

                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="superAdminHome.html">Nazir Herbal Store</a></li>
                                <li className="breadcrumb-item active"><span>Admin Management</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- Page Header End -->*/}

            {/*<!-- Main Content Start -->*/}
            <section className="main--content">
                <div className="panel">
                    {/*<!-- Records Header Start -->*/}
                    <div className="records--header">
                        <div className="title fa-user">
                            <h3 className="h3">Admins</h3>
                            <p>Found Total {this.state.featured.length} Admins</p>
                        </div>

                        <div className="actions">
                            <Link to="/admin/add" className="addProduct btn btn-lg btn-rounded btn-primary">Add Admin</Link>
                        </div>
                    </div>
                    {/*<!-- Records Header End -->*/}
                </div>

                <div className="panel">
                    {/*<!-- Records List Start -->*/}
                    <div className="records--list" data-title="Admins List">
                        <table id="recordsListView">
                            <thead>
                                <tr>
                                    <th className="not-sortable">Profile Picture</th>
                                    <th>Name</th>
                                    {/* <th>Date of Birth</th> */}
                                    <th>CNIC Number</th>
                                    <th>Contact Number</th>
                                    <th>Date of Joining</th>
                                    <th>Address</th>
                                    <th>Role</th>
                                    <th className="not-sortable">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr></tr>
                            {
                                this.state.featured.map((value)=>
                                {
                                    return (
                                    <tr>
                                        <td>
                                            <a href="#" className="btn-link">
                                                <img src={value.pimage} width="60" height="80" alt=""/>
                                            </a>
                                        </td>
                                        <td>{value.name}</td>
                                        {/* <td>DOB</td> */}
                                        <td>{value.cnic}</td>
                                        <td>{value.phone}</td>
                                        <td>{value.createdAt}</td>
                                        <td>{value.address}</td>
                                        <td>
                                            <span className="label label-success">{value.role}</span>
                                        </td>
                                        <td>
                                            <div className="dropleft">
                                                <a href="#" className="btn-link" data-toggle="dropdown"><i className="fa fa-ellipsis-v"></i></a>

                                                <div className="dropdown-menu">
                                                    {/* <a href="#" className="dropdown-item">Edit</a> */}
                                                    <Link to="/admin/manage" className="dropdown-item" onClick ={()=>this.handleDelete(value)} >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    {/*<!-- Records List End -->*/}
                </div>

                <div id="warningInModal" className="modal fade">
                    {/*<!-- Modal Start -->*/}
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure you want to remove this Admin?</h5>
                            </div>

                            <div className="modal-body pt-4">
                                <input type="submit" value="Yes" className="btn btn-sm btn-rounded btn-outline-success"/>
                                <button type="button" className="btn btn-sm btn-rounded btn-outline-danger" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                    {/*<!-- Modal End -->*/}
                </div>
            </section>
            {/*<!-- Main Content End -->*/}

            {/*<!-- Main Footer Start -->*/}
            <footer className="main--footer main--footer-transparent">
                <p>2021 &copy; <a href="#">Nazir Herbal Store</a>. All Rights Reserved.</p>
            </footer>
            {/*<!-- Main Footer End -->*/}
        </main>
                    {/* {{/*{/*<!-- Main Container End -->*/}
                </div>
                {/* {{/*{/*<!-- Wrapper End -->*/}

				{/* < Footer /> */}
			</div>
		);
    }
}

export default adminManagement;