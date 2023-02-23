import React, { Component, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import fireDatabase from "../firebase";
import Modal from 'react-modal'
Modal.setAppElement('#root')

class ProductList extends Component {
	constructor() {
		super();
		this.state = {
			featured: [],
			request: [],
			catList: [],
			showModal: false,
			reqItem: "",
			cart: JSON.parse(localStorage.getItem("nhsCart") || "[]"),
			searchTerm: "",
			value: "",
			currentPage: 1,
			totalPages: 3,
			itemsOnPage: 8,
			currentCategory: "",
			lowerLimit: 0,
			upperLimit: 0

		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	};
	handleChange(event) {
		this.setState({ value: event.target.value });
	}


	handleSubmit(event) {
		event.preventDefault()
		this.setState({
			searchTerm: this.state.value
		})

		//console.log(this.state.value);
	}
	handlePrev() {

		var newCurr = this.state.currentPage - 1;
		if (newCurr > 0) {
			this.setState({
				currentPage: newCurr
			})
		}
	}
	handleNext() {
		var newCurr = (this.state.currentPage + 1);
		if (newCurr !== Math.ceil(this.state.featured.length / this.state.itemsOnPage) + 1) {
			this.setState({
				currentPage: newCurr
			})

		}
	}

	componentDidMount() {
		var ref = fireDatabase.database().ref("products");
		var refCat = fireDatabase.database().ref("Category")

		ref.on("value", snapshot => {
			var featuredList = []
			var unavailable = []


			snapshot.forEach(value => {
				var units = value.val().stockUnits


				if (units !== 0) {
					featuredList.push(value.val())

				} else {
					var data = {
						title: value.val().title,
						image: value.val().image,
						price: value.val().price,
						category: value.val().category,
						stockUnits: 0,
						key: value.key

					}
					unavailable.push(data)
				}

			});
			this.setState({
				featured: [...featuredList, ...unavailable]
				//request: unavailable
			});

		});

		refCat.on("value", snapshot => {
			var catItems = []
			catItems.push({
				title: "All"
			})

			snapshot.forEach(value => {
				catItems.push(value.val())
			});

			this.setState({
				catList: catItems
			});
		});
	};

	addRequest = (item) => {
		this.setState({ showModal: true, reqItem: item.title })
		//console.log(item.key)
		var myRef = fireDatabase.database().ref("requests/");
		var reqData = {
			requested_id: item.key,
			title: item.title
		}
		myRef.push(reqData);
	};
	addCat = (item) => {
		this.setState({
			currentCategory: item
		})
	}
	addPrice = (prev, next) => {


		this.setState({
			lowerLimit: prev,
			upperLimit: next
		})
	}

	render() {


		let rows = [];

		for (let i = 0; i < Math.ceil(this.state.featured.length / this.state.itemsOnPage); i++) {
			if (i + 1 == this.state.currentPage) {
				rows.push(<li key={i} className="active"><a href="javascript:void(0);">{i + 1}</a></li>);

			}
			else {
				rows.push(<li key={i}><a href="javascript:void(0);">{i + 1}</a></li>);
			}

		}
		var last = this.state.currentPage * this.state.itemsOnPage;
		var first = last - this.state.itemsOnPage;
		return (
			<div>
				<Modal isOpen={this.state.showModal} style={{
					content: {
						position: 'absolute',
						inset: '40px',
						border: '1px solid rgb(204, 204, 204)',
						background: 'rgb(255, 255, 255)',
						overflow: 'auto',
						borderRadius: '12px',
						outline: 'none',
						padding: '20px',
						height: '300px',
						width: '400px',
						marginLeft: 'auto',
						marginRight: 'auto',
						marginTop: 'auto',
						marginBottom: 'auto'
					}
				}

				}>
					<div>
						<section className="modal-main">
							<h3 className="headingVII fwEbold text-uppercase mb-5">Thank You for your request!</h3>
							<h3 className="headingVII fwEbold text-uppercase mb-5">We will notify you as soon as<h2> {this.state.reqItem} </h2>  is available.</h3>
							<div className='modal-Button'><button
								onClick={() => this.setState({ showModal: false })}
								className="btn btnTheme btnShop fwEbold text-white md-round py-md-3 px-md-4 py-2 px-3"
							>
								<i className="fas fa-arrow-left ml-2">
									{" "}
									Back To Shopping !
								</i>
							</button>
							</div>
						</section>
					</div>
				</Modal>

				<Header shoppingCart={this.props.shoppingCart} />
				<main>
					{/* <!-- introBannerHolder -->*/}
					<section className="introBannerHolder d-flex w-100 bgCover" style={{ backgroundImage: "url(./../assets/images/1263x300.png)" }}>
						<div className="container">
							<div className="row">
								<div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
									<h1 className="headingIV fwEbold playfair mb-4 active">All Products</h1>
									<ul className="list-unstyled breadCrumbs d-flex justify-content-center">
										<li className="mr-sm-2 mr-1"><Link to="/">Home</Link></li>
										<li className="mr-sm-2 mr-1">/</li>
										<li className="mr-sm-2 mr-1">Product List</li>
									</ul>
								</div>
							</div>
						</div>
					</section>
					{/*<!-- twoColumns -->*/}
					{/*<!-- twoColumns -->*/}
					<div className="twoColumns container pt-lg-23 pb-lg-20 pt-md-16 pb-md-4 pt-10 pb-4">
						<div className="row">
							<div className="col-12 col-lg-9 order-lg-3">
								{/*<!-- content -->*/}
								<article id="content">
									{/*<!-- show-head -->*/}
									<header className="show-head d-flex flex-wrap justify-content-between mb-7">
										<ul className="list-unstyled viewFilterLinks d-flex flex-nowrap align-items-center">

											<li className="mr-2">Showing {first + 1}–{last} of {this.state.featured.length} results</li>
										</ul>
										{/*<!-- sortGroup -->*/}
										<div className="sortGroup">
											<div className="d-flex flex-nowrap align-items-center">


											</div>
										</div>
									</header>
									<div className="row">
									</div>
								</article>
								<div className="cartHolder container pt-xl-21 pb-xl-24 py-lg-20 py-md-2 py-10">
									<div className="row t-responsive">
										{/*<!-- cartTable -->*/}
										<table className="table cartTable">
											<thead>
												<tr>
													<th scope="col" className="text-uppercase fwEbold border-top-0">Product</th>
													<th scope="col" className="text-uppercase fwEbold border-top-0">Approx Price (100g)</th>
													<th scope="col" className="text-uppercase fwEbold border-top-0">Make a Request</th>
												</tr>
											</thead>
											<tbody>
												{
													this.state.featured.filter((value) => {
														//console.log(this.state.searchTerm)
														if (this.state.searchTerm === "") {
															return value
														}
														else if (value.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
															return value
														}
													}).filter((value) => {
														console.log(this.state.currentCategory)
														if (this.state.currentCategory === "" || this.state.currentCategory === "All") {
															return value
														}
														else if (this.state.currentCategory.toLowerCase().includes(value.category.toLowerCase())) {
															return value
														}

													}).filter((value) => {
														console.log(this.state.lowerLimit)
														console.log(this.state.upperLimit)
														if (this.state.lowerLimit === 0 && this.state.upperLimit === 0) {
															return value
														}
														else if (value.price >= this.state.lowerLimit && value.price <= this.state.upperLimit) {
															return value
														}

													}).slice(first, last).map((value, index) => {
														if (value.stockUnits == 0) {
															var msg = <td className="fwEbold border-top-0 border-bottom px-0 py-6"><button className="btn btnTheme btnCart fwEbold text-center text-white md-round py-3 px-4 py-md-3 px-md-4" onClick={() => this.addRequest(value)}>Request</button> </td>

														}
														else {
															var msg = <td className="fwEbold border-top-0 border-bottom px-0 py-6"><Link to="#" className="btn btnTheme btnCart fwEbold text-center text-white md-round py-3 px-4 py-md-3 px-md-4" onClick={() => this.props.addToShoppingCart(value)}>Add to Cart</Link> </td>
														}
														return (
															<tr className="align-items-center">
																<td className="d-flex align-items-center border-top-0 border-bottom px-0 py-6">
																	<div className="imgHolder">
																		<img src={value.image} alt={value.title} className="img-fluid"></img>
																		<span className={value.discount === 0 ? "" : "hotOffer green fwEbold text-uppercase text-white position-absolute d-block"}>{value.discount === 0 ? "" : "SALE"}</span>
																	</div>
																	<div style={{ width: "100%" }}>
																		<span className="title pl-2"><Link to={{ pathname: "/productDetail", state: { value } }}>{value.title}</Link></span>
																		<span className="float-right pr-10  "></span>
																	</div>
																</td>
																<td key={index} className="fwEbold border-top-0 border-bottom px-0 py-6">Rs. {value.price - value.discount}</td>
																{msg}

															</tr>
														)
													})
												}
												{
													// this.state.request.filter((value) => {
													// 	console.log(this.state.searchTerm)
													// 	if (this.state.searchTerm == "") {
													// 		return value
													// 	}

													// 	else if (value.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
													// 		return value
													// 	}
													// }).map((value, index) => {
													// 	return (
													// 		<tr className="align-items-center">
													// 			<td className="d-flex align-items-center border-top-0 border-bottom px-0 py-6">
													// 				<div className="imgHolder">
													// 					<img src={value.image} alt={value.title} className="img-fluid"></img>
													// 				</div>
													// 				<div style={{ width: "100%" }}>
													// 					<span className="title pl-2"><Link to={{ pathname: "/productDetail", state: { value } }}>{value.title}</Link></span>
													// 					<span className="float-right pr-10  "></span>
													// 				</div>
													// 			</td>
													// 			<td key={index} className="fwEbold border-top-0 border-bottom px-0 py-6">{value.price} PKR</td>
													// 			<td className="fwEbold border-top-0 border-bottom px-0 py-6"><button className="btn btnTheme btnCart fwEbold text-center text-white md-round py-3 px-4 py-md-3 px-md-4" onClick={() => this.addRequest(value)}>Request</button> </td>
													// 		</tr>
													// 	)
													// })

												}

											</tbody>
										</table>
										<div className="col-12 pt-3 mb-lg-0 mb-md-6 mb-3">
											{/*<!-- pagination -->*/}
											<ul className="list-unstyled pagination d-flex justify-content-center align-items-end">
												<li onClick={() => this.handlePrev()}><a href="javascript:void(0);"><i className="fas fa-chevron-left"></i></a></li>
												{/* <li className="active"><a href="javascript:void(0);">1</a></li>
											<li><a href="javascript:void(0);">2</a></li>
											<li>..</li> */}
												{rows}

												<li onClick={() => this.handleNext()}><a href="javascript:void(0);"><i className="fas fa-chevron-right"></i></a></li>
											</ul>
										</div>

									</div>
								</div>
							</div>
							<div className="col-12 col-lg-3 order-lg-1">
								{/*<!-- sidebar -->*/}
								<aside id="sidebar">
									{/*<!-- widget -->*/}
									<section className="widget overflow-hidden mb-9">
										<form className="searchForm position-relative border" onSubmit={this.handleSubmit}>
											<fieldset>
												<input type="search" className="form-control" placeholder="Search product..." onChange={this.handleChange}></input>
												<button className="position-absolute" ><i className="icon-search"></i></button>
											</fieldset>
										</form>
									</section>
									{/*<!-- widget -->*/}
									<section className="widget overflow-hidden mb-9">
										<h3 className="headingVII fwEbold text-uppercase mb-5">PRODUCT CATEGORIES</h3>
										<ul className="list-unstyled categoryList mb-0">
											{
												this.state.catList.map(value => {
													return (
														<li className="mb-5 overflow-hidden" onClick={() => this.addCat(value.title)}><a href="javascript:void(0);">{value.title} </a></li>

													)
												})
											}
										</ul>
									</section>
									{/*<!-- widget -->*/}
									<section className="widget mb-9">
										<h3 className="headingVII fwEbold text-uppercase mb-6">Filter by Price</h3>
										{/*<!-- filter ranger form -->*/}
										<ul className="list-unstyled categoryList mb-0">

											<li className="mb-5 overflow-hidden" onClick={() => this.addPrice(0, 500)}><a href="javascript:void(0);">{"< 500"}</a></li>
											<li className="mb-5 overflow-hidden" onClick={() => this.addPrice(500, 1000)}><a href="javascript:void(0);">{"500 - 1000"}</a></li>
											<li className="mb-5 overflow-hidden" onClick={() => this.addPrice(1000, 2000)}><a href="javascript:void(0);">{"1000 - 2000"}</a></li>
											<li className="mb-5 overflow-hidden" onClick={() => this.addPrice(2000, 100000)}><a href="javascript:void(0);">{"> 2000"}</a></li>
											<li className="mb-5 overflow-hidden" onClick={() => this.addPrice(0, 0)}><a href="javascript:void(0);">{"All Prices"}</a></li>



										</ul>
									</section>
								</aside>
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}

export default ProductList;