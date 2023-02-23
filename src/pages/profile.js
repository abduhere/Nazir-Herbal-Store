import React, { Component } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

class Profile extends Component {
	render() {
		return (
			<div>
				<Header shoppingCart = {this.props.shoppingCart} />
				<main>
					<section className="introBannerHolder d-flex w-100 bgCover" style={{backgroundImage: "url(./../assets/images/1263x300.png)"}}>
						<div className="container">
							<div className="row">
								<div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
									<h1 className="headingIV fwEbold playfair mb-4">Profile</h1>
									<ul className="list-unstyled breadCrumbs d-flex justify-content-center">
										<li className="mr-sm-2 mr-1"><a href="index.html">Home</a></li>
										<li className="mr-sm-2 mr-1">/</li>
										<li className="active">My Profile</li>
									</ul>
								</div>
							</div>
						</div>
					</section>
					{/*<!-- cartHolder -->*/}
					<section className="contactSecBlock container pt-xl-23 pb-xl-24 pt-lg-20 pb-lg-10 pt-md-16 pb-md-8 py-10">
						<div className="row">
							<header className="col-12 mainHeader mb-10 text-center">
								<h1 className="headingIV playfair fwEblod mb-7">Account Information</h1>
							</header>
						</div>
						<div className="row">
							<div className="col-12">
								<form className="contactForm">
									<div className="d-flex flex-wrap row1 mb-md-1">
										<div className="form-group coll mb-5">
											<input type="text" id="name" className="form-control" name="name" placeholder="Your name  *" value="User"/>
										</div>
										<div className="form-group coll mb-5">
											<input type="email" className="form-control" id="email" name="Email" placeholder="Your email  *" value="user@gmail.com"/>
										</div>
										<div className="form-group coll mb-5">
											<input type="tel" className="form-control" id="tel" name="tel" placeholder="Telephone number  *" value="111244622"/>
										</div>
									</div>
									<div className="form-group w-100 mb-6">
										<textarea className="form-control" placeholder="Address *">This is my address</textarea>
									</div>
									<div className="text-center">
										<button type="submit" className="btn btnTheme btnShop md-round fwEbold text-white py-3 px-4 py-md-3 px-md-4">Edit Profile</button>
									</div>
								</form>
							</div>
						</div>
					</section>
					<div className="cartHolder container pt-xl-21 pb-xl-24 py-lg-20 py-md-16 py-10">
						<h1 className="headingIV playfair fwEblod mb-7 pb-10">Order History</h1>
						<div className="row">
							{/*<!-- table-responsive -->*/}
							<div className="col-12 table-responsive mb-xl-22 mb-lg-10 mb-md-16 mb-10">
								{/*<!-- cartTable -->*/}
								<table className="table cartTable">
									<thead>
										<tr>
											<th scope="col" className="text-uppercase fwEbold border-top-0 pr-30">Order Number</th>
											<th scope="col" className="text-uppercase fwEbold border-top-0">Subtotal</th>
											<th scope="col" className="text-uppercase fwEbold border-top-0">Date</th>
											<th scope="col" className="text-uppercase fwEbold border-top-0">Order Status</th>
											<th scope="col" className="text-uppercase fwEbold border-top-0"></th>
											<th scope="col" className="text-uppercase fwEbold border-top-0"></th>
										</tr>
									</thead>
									<tbody>
										<tr className="align-items-center">
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">
												<div className="imgHolder">
													<img src="assets/images/Store/1.png" alt="image description" className="img-fluid"/>
												</div> 
												<div style={{width: "100%"}}>
												<span className="title pl-2"><a href="shop-detail.html">Order 1234567</a></span>
												</div>
											</td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">2000 PKR</td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">5th May 2021</td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">Pending Approval</td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6"><button type="submit" className="btn btnTheme btnCart fwEbold text-center text-white md-round py-3 px-4 py-md-3 px-md-4">Reorder</button></td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6"><button type="submit" className="btn btnCart fwEbold text-center text-white md-round py-3 px-4 py-md-3 px-md-4">Track your order</button></td>
										</tr>
										<tr className="align-items-center">
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">
												<div className="imgHolder">
													<img src="assets/images/Store/2.png" alt="image description" className="img-fluid"/>
												</div> 
												<div style={{width: "100%"}}>
												<span className="title pl-2"><a href="shop-detail.html">Order 67890</a></span>
												</div>
											</td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">1500 PKR</td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">12th January 2021</td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">Delivered</td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6"><button type="submit" className="btn btnTheme btnCart fwEbold text-center text-white md-round py-3 px-4 py-md-3 px-md-4">Reorder</button></td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6"><button type="submit" className="btn btnCart fwEbold text-center text-white md-round py-3 px-4 py-md-3 px-md-4"></button></td>
										</tr>
										<tr className="align-items-center">
											<td className="d-flex align-items-center border-top-0 border-bottom px-0 py-6">
												<div className="imgHolder">
													<img src="http://placehold.it/70x80" alt="image description" className="img-fluid"/>
												</div>
												<span className="title pl-2"><a href="shop-detail.html">Aliquam Quaerat Voluptem</a></span>
											</td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">180.00 PKR</td>
											<td className="border-top-0 border-bottom px-0 py-6"><input type="number" placeholder="1"/></td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">180.00 PKR <a href="javascript:void(0);" className="fas fa-times float-right"></a></td>
										</tr>
										<tr className="align-items-center">
											<td className="d-flex align-items-center border-top-0 border-bottom px-0 py-6">
												<div className="imgHolder">
													<img src="http://placehold.it/70x80" alt="image description" className="img-fluid"/>
												</div>
												<span className="title pl-2"><a href="shop-detail.html">Pellentesque aliquet</a></span>
											</td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">180.00 $</td>
											<td className="border-top-0 border-bottom px-0 py-6"><input type="number" placeholder="1"/></td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">180.00 $ <a href="javascript:void(0);" className="fas fa-times float-right"></a></td>
										</tr>
										<tr className="align-items-center">
											<td className="d-flex align-items-center border-top-0 border-bottom px-0 py-6">
												<div className="imgHolder">
													<img src="http://placehold.it/70x80" alt="image description" className="img-fluid"/>
												</div>
												<span className="title pl-2"><a href="shop-detail.html">Sint Incidunt Utlabore</a></span>
											</td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">180.00 $</td>
											<td className="border-top-0 border-bottom px-0 py-6"><input type="number" placeholder="1"/></td>
											<td className="fwEbold border-top-0 border-bottom px-0 py-6">180.00 $ <a href="javascript:void(0);" className="fas fa-times float-right"></a></td>
										</tr> 
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}

export default Profile;