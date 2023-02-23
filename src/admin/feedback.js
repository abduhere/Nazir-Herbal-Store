import React,{ Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";

class adminFeedback extends Component  {
	constructor() {
		super();
		this.state = {
			feedback: [],
			
		};
	};

	componentDidMount() {
		var ref =  fireDatabase.database().ref("feedback");
		ref.on("value", snapshot => {
			var featuredList = []
			snapshot.forEach(value => {
				featuredList.push(value.val())
			});
			this.setState({
				feedback: featuredList
			});
		});
	};

    handleShow = (v) =>
    {
        var ref = fireDatabase.database().ref("feedback")
        ref.on("value", function(snapshot){
            snapshot.forEach(value => {
                if(JSON.stringify(value.val()) === JSON.stringify(v))
                {
                    value.ref.update({
                        "status": 'Visible'
                    })
                }
            })
        })
    }

    handleNotShow = (v) =>
    {
        var ref = fireDatabase.database().ref("feedback")
        ref.on("value", function(snapshot){
            snapshot.forEach(value => {
                if(JSON.stringify(value.val()) === JSON.stringify(v))
                {
                    value.ref.update({
                        "status": 'Invisible'
                    })
                }
            })
        })
    }

    render() {
        console.log("here")
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
                                        <h2 className="page--title h5">Feedback Forms</h2>
                                        {/* <!-- Page Title End --> */}

                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/admin/home">Home</Link></li>
                                            <li className="breadcrumb-item active"><span>Feedback Forms</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* <!-- Page Header End --> */}

                        {/* <!-- Main Content Start --> */}
                        <section className="main--content">

                            <div className="panel">
                                {/* <!-- Records List Start --> */}
                                <div className="records--list" data-title="Feedback from Customers">
                                    <table id="recordsListView">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Feedback</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr></tr>
                                            {    
                                            this.state.feedback.map((value, index)=>
                                                {
                                                    return (
                                                    <tr>
                                                        <td>
                                                            <a href="#" className="btn-link">{value.name}</a>
                                                        </td>
                                                        <td>
                                                            <a href="#" className="btn-link">{value.email}</a>
                                                        </td>
                                                        <td>{value.feedback}</td>
                                                        <td>
                                                            <span className={value.status === "Visible" ? "label label-success" : "label label-warning"}>{value.status}</span>
                                                        </td>
                                                        <td>
                                                            <div className="dropleft">
                                                                <a href="#" className="btn-link" data-toggle="dropdown"><i className="fa fa-ellipsis-v"></i></a>
                                                                    
                                                                <div className="dropdown-menu">
                                                                    <Link to="/admin/feedback" className="dropdown-item" onClick = {() => this.handleShow(value)}>Show</Link>
                                                                    <Link to="/admin/feedback" className="dropdown-item" onClick ={() => this.handleNotShow(value)}>Do Not Show</Link>
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
                                {/* <!-- Records List End --> */}
                            </div>
                        {/* <!-- Main Footer Start --> */}
                            <footer className="main--footer main--footer-light">
                                <p>Copyright &copy; <a href="#">Nazir Herbal Store</a>. All Rights Reserved.</p>
                            </footer>
                        {/* <!-- Main Footer End --> */}
                        </section>
                        {/* <!-- Main Content End --> */}
                    </main>

                    {/* {{/*<!-- Main Container End -->*/} 
                </div>
                {/* {{/*<!-- Wrapper End -->*/} 

				{/* < Footer /> */}
			</div>
		);
    }
}

export default adminFeedback;