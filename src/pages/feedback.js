import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import fireDatabase from "../firebase";
import Modal from 'react-modal'
Modal.setAppElement('#root')

class Feedback extends Component {
	constructor () {
		super();
		this.state = {
			currentUser: fireDatabase.auth().currentUser,
			name: null,
			email: null,
			showModal: false
		};
	}

	componentDidMount = () => {
		if (this.state.currentUser !== null) {
			this.setState({
				name: this.state.currentUser.displayName,
				email: this.state.currentUser.email
			});
		}
	}

	handleSubmit = () => {
		var input = {
			feedback : document.getElementById("feedback").value,
			category : document.getElementById("sel1").value,
			name : document.getElementById("name").value,
			email : document.getElementById("email").value,
			status: "Invisible"
		};
		this.setState({
			showModal: true
		})
		fireDatabase.database().ref("feedback").push(input);
	}

	render() {
		return (
			<div>
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
                    <h3 className="headingVII fwEbold text-uppercase mb-5">Feedback has been sent!</h3>
                    <div className='modal-Button'><button
                        onClick={() => this.setState({showModal: false})}
                        className="btn btnTheme btnShop fwEbold text-white md-round"
                        >
                        <i className="fas ml-2">
                            {" "}
                            Back to the website!
                        </i>
                        </button>
                    </div>
                </section>
            </div>
        </Modal>
				<Header shoppingCart = {this.props.shoppingCart} />
				<main>
					<section className="introBannerHolder d-flex w-100 bgCover" style={{backgroundImage: "url(./../assets/images/1263x300.png)"}}>
						<div className="container">
							<div className="row">
								<div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
									<h1 className="headingIV fwEbold playfair mb-4">Feedback</h1>
									<ul className="list-unstyled breadCrumbs d-flex justify-content-center">
										<li className="mr-sm-2 mr-1"><Link to="/">Home</Link></li>
										<li className="mr-sm-2 mr-1">/</li>
										<li className="active">Feedback</li>
									</ul>
								</div>
							</div>
						</div>
					</section>
					{/*<!-- twoColumns -->*/}
					<div className="twoColumns container pt-xl-23 pb-xl-20 py-lg-20 py-md-16 py-10">
						<div className="row">
							<div className="col-12">
								{/*<!-- commentFormArea -->*/}
								<div className="commentFormArea">
									<h2 className="headingVII text-uppercase mb-5">Please provide your valuable feedback</h2>
									<form className="commentform">
										<div className="form-group w-100 mb-5">
											<textarea id="feedback" className="form-control" placeholder="Feedback"></textarea>
										</div>
										<div className="d-flex flex-wrap row1 mb-md-5">
											<div className="form-group coll mb-5">
												<label htmlFor="name" className="mb-1">Name *</label>
												<input type="text" id="name" className="form-control" name="name" required value={this.state.name === null ? undefined : this.state.name}/>
											</div>
											<div className="form-group coll mb-5">
												<label htmlFor="email" className="mb-1">Email *</label>
												<input type="email" className="form-control" id="email" name="Email" required value={this.state.email === null ? undefined : this.state.email}/>
											</div>
											<div className="form-group coll mb-5">
												<label htmlFor="related" className="mb-1">Feedback Category</label>
												<select className="form-control" id="sel1">
													<option>Products</option>
													<option>Order</option>
													<option>Delivery</option>
													<option>Other</option>
												</select>
											</div>
										</div>
										<Link to="#" type="submit" className="btn btnTheme btnShop md-round fwEbold text-white py-3 px-4 py-md-3 px-md-4" onClick = {() => this.handleSubmit()}> Send Feedback <i className="fas fa-arrow-right ml-2"></i></Link>
									</form>
								</div>
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}

export default Feedback;
