import React,{ Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link, Redirect } from "react-router-dom";
import fireDatabase from "../firebase";
import firebase from "../firebase";
import Modal from 'react-modal'
Modal.setAppElement('#root')

class addAdmin extends Component  {
	constructor() {
		super();
		this.state = {
            email: "",
            first: "",
            middle: "",
            last: "",
            password: "",
            username: "",
            role: "",
            cnic: "",
            contactNumber: "",
            errorMessage: "",
            address: "",
            pimage: [],
            createdAt: [],
            registered: false
		};
	};

    updateEmail = (ev) => {
        console.log(ev.target.value);
        this.setState({
            email: ev.target.value
        });
    };

    updateFirst = (ev) => {
        console.log(ev.target.value);
        this.setState({
            first: ev.target.value
        });
    };

    updateLast = (ev) => {
        console.log(ev.target.value);
        this.setState({
            last: ev.target.value
        });
    };

    updatePassword = (ev) => {
        this.setState({
            password: ev.target.value
        });
    };

    updateRole = (ev) => {
        console.log(ev.target.value);
        this.setState({
            role: ev.target.value
        });
    };

    updateCnic = (ev) => {
        console.log(ev.target.value);
        this.setState({
            cnic: ev.target.value
        });
    };

    updateContactNumber = (ev) => {
        this.setState({
            contactNumber: ev.target.value
        });
    };

    updateUsername = (ev) => {
        this.setState({
            username: ev.target.value
        });
    };

    updateAddress = (ev) => {
        this.setState({
            address: ev.target.value
        });
    };

    updatePimg = (event) =>
    {
        if (event.target.files && event.target.files[0]) {
            let pimage = event.target.files[0];
            this.setState({
            pimage: pimage
            });
        }
    };

    handleRegister = () => {
        console.log("hello");
        var ref = fireDatabase.database().ref("admins");
        var num = 0
        ref.on("value", function(snapshot) {
            num = snapshot.numChildren() + 1
          })
        var d = Date.now()
        var d2 = new Date(d).toDateString()
        this.setState(
            {
                createdAt: d2,
            }
        )

        const uploadTask = firebase.storage().ref(`images/profile/` + String(num)).put(this.state.pimage);
        uploadTask.on('state_changed',
        (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                firebase.storage().ref('images/profile/' + String(num)).getDownloadURL().then(
                    url => {
                        this.setState(
                            {
                                pimage : url
                            }
                        )
                    }
                )
            })
        fireDatabase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredentials) => {
            fireDatabase.database().ref("admins/").child(userCredentials.user.uid).set({
                name: this.state.first.concat(" ", this.state.last),
                email: this.state.email,
                phone: this.state.contactNumber,
                username: this.state.username,
                address: this.state.address,
                role: this.state.role,
                cnic: this.state.cnic,
                createdAt: this.state.createdAt,
                pimage: this.state.pimage,
            });

            userCredentials.user.updateProfile({
                displayName: this.state.name
            });

            this.setState({
                errorMessage: "Account created successfully!",
                registered: true
            });
            this.setState({
                showModal: true
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/email-already-in-use") {
                this.setState({
                    errorMessage: "Email already in use!"
                });
            }
            else if (errorCode === "auth/weak-password") {
                this.setState({
                    errorMessage: "Password streangth is too weak!"
                })
            }
            else {
                this.setState({
                    errorMessage: errorMessage
                })
            };
        });
    };


    render() {
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
                        marginBottom: 'auto'}}}>
                        <div>
                            <section className="modal-main bg-light">
                                <h3 className="headingVII fwEbold text-uppercase text-center my-5">Admin Added Successfully</h3>
                                <div className='align-middle text-center'>
                                    <Link to="/admin/manage" className="btn btn-primary">Back to Admin Management</Link>
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
                                        <h2 className="page--title h5">Add Admin</h2>
                                        {/*<!-- Page Title End -->*/}

                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="superAdminHome.html">Nazir Herbal Store</a></li>
                                            <li className="breadcrumb-item"><a href="adminManagement.html">Admin Management</a></li>
                                            <li className="breadcrumb-item active"><span>Add Admin</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/*<!-- Page Header End -->*/}

                        {/*<!-- Main Content Start -->*/}
                        <section className="main--content">
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Add Admin</h3>
                                </div>

                                <div className="panel-content">
                                    {/*<!-- Form Wizard Start -->*/}
                                    <form action="#" id="formWizard" className="form--wizard">
                                        <h3>Identification</h3>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            <span className="label-text">First Name: *</span>
                                                            <input type="text" name="fname" className="form-control" required onChange= {(event) => {this.updateFirst(event)}} />
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            <span className="label-text">Last Name: *</span>
                                                            <input type="text" name="lname" className="form-control" required onChange= {(event) => {this.updateLast(event)}}/>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            <span className="label-text">CNIC: * (xxxxx-xxxxxxx-x)</span>
                                                            <input type="text" name="mname"className="form-control" onChange= {(event) => {this.updateCnic(event)}}/>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            <span className="label-text">Email: *</span>
                                                            <input type="email" name="email" className="form-control" required onChange= {(event) => {this.updateEmail(event)}}/>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            <span className="label-text">Phone:</span>
                                                            <input type="tel" name="phone" className="form-control" onChange= {(event) => {this.updateContactNumber(event)}}/>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            <span className="label-text">Address: *</span>
                                                            <input type="text" name="address" className="form-control" required onChange= {(event) => {this.updateAddress(event)}}/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <h3>Login Info</h3>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            <span className="label-text">Username: *</span>
                                                            <input type="text" name="uname" className="form-control" required onChange= {(event) => {this.updateUsername(event)}}/>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            <span className="label-text">Password: *</span>
                                                            <input type="password" name="password" id="password" className="form-control" required onChange= {(event) => {this.updatePassword(event)}}/>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div class="form-group">
                                                        <span className="label-text">Role *</span>
                                                        <select name="role" id="role"  class="form-control" required onChange= {(event) => {this.updateRole(event)}}>
                                                            <option>Super Admin</option>
                                                            <option>Admin</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <h3>Add Profile Picture</h3>
                                        <section>
                                            {/*-- Panel Start -*/}
                                            <div className="panel">
                                                <div className="panel-content">
                                                    <form action="#" id="dropzone01" className="dropzone" method="post" enctype="multipart/form-data">
                                                    <div className="dz-message" data-dz-message ><input type="file" onChange={(event) => this.updatePimg(event)}></input></div>
                                                    </form>
                                                </div>
                                            </div>
                                            {/*-- Panel End -*/}
                                            <div className={this.state.errorMessage === "Account created successfully!"? "m-account--title" :"m-account--title text-danger"}>
                                                {this.state.errorMessage}
                                            </div>
                                            <div className="m-account--actions">
                                                <Link to="#" className="btn btn-block btn-rounded btn-info" onClick= {() => {this.handleRegister()}}> Register Admin</Link>
                                                <Link to ="/admin/manage"><button type="button" className="btn btn-block btn-rounded btn-outline-secondary mx-2">Cancel</button></Link>
                                            </div>
                                        </section>
                                    </form>
                                    {/*<!-- Form Wizard End -->*/}
                                </div>
                            </div>
                        </section>
                        {/*<!-- Main Content End -->*/}

                        {/*<!-- Main Footer Start -->*/}
                        <footer className="main--footer main--footer-transparent">
                            <p>2021 &copy; <a href="#">Nazir Herbal Store</a>. All Rights Reserved.</p>
                        </footer>
                        {/*<!-- Main Footer End -->*/}
                    </main>
                    {/* {{/*<!-- Main Container End -->*/} 
                </div>
                {/* {{/*<!-- Wrapper End -->*/} 

				{/* < Footer /> */}
			</div>
		);
    }
}

export default addAdmin;