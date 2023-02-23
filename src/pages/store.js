import React, { Component, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import fireDatabase from "../firebase";
import { thisExpression } from "@babel/types";

class Store extends Component {
	constructor() {
		super();
		this.state = {
			featured: [],
			catList: [],
			wishList: JSON.parse(localStorage.getItem("nhsWishList") || "[]"),
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
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}
	handlePrev() {
		var newCurr = this.state.currentPage - 1;

		if (newCurr > 0) {
			console.log("back to", newCurr);
			this.setState({
				currentPage: newCurr
			})

		}
	}
	handleNext() {
		var newCurr = (this.state.currentPage + 1);
		if (newCurr !== Math.ceil(this.state.featured.length / this.state.itemsOnPage) + 1) {
			console.log("ceil is ", newCurr);
			this.setState({
				currentPage: newCurr
			})

		}




	}

	handleSubmit(event) {
		event.preventDefault()
		this.setState({
			searchTerm: this.state.value
		});
	}

	componentDidMount() {
		var ref = fireDatabase.database().ref("products");
		var refCat = fireDatabase.database().ref("Category")

		ref.on("value", snapshot => {
			var featuredList = []


			snapshot.forEach(value => {
				var units = value.val().stockUnits


				if (units !== 0) {
					featuredList.push(value.val())

				}

			});
			this.setState({
				featured: featuredList
			});
			console.log(this.state.featured)
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
			console.log(this.state.catList)
		});
	}
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
				<Header shoppingCart={this.props.shoppingCart} />
				<main>
					{/*<!-- introBannerHolder -->*/}
					<section className="introBannerHolder d-flex w-100 bgCover" style={{ backgroundImage: "url(../assets/images/1263x300.png)" }}>
						<div className="container">
							<div className="row">
								<div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
									<h1 className="headingIV fwEbold playfair mb-4">Store</h1>
									<ul className="list-unstyled breadCrumbs d-flex justify-content-center">
										<li className="mr-2"><Link to="/">Home</Link></li>
										<li className="mr-2">/</li>
										<li className="active">Store</li>
									</ul>
								</div>
							</div>
						</div>
					</section>
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
										{
											this.state.featured.filter((value) => {

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
												return (
													// {/*<!-- featureCol -->*/}
													<div className="col-12 col-sm-6 col-lg-4 featureCol mb-7">
														<div className="border">
															<div className="imgHolder position-relative w-100 overflow-hidden">
																<img src={value.image} alt="" className="img-fluid w-100"></img>
																<ul className="list-unstyled postHoverLinskList d-flex justify-content-center m-0">
																	<li className="mr-2 overflow-hidden"><Link className="icon-heart d-block" onClick={() => this.addToWishList(value)} ></Link></li>
																	<li className="mr-2 overflow-hidden"><Link to={{ pathname: "/productDetail", state: { value } }} className="icon-eye d-block"></Link></li>
																	<li className="overflow-hidden"><Link to="#" className="icon-cart d-block" onClick={() => this.props.addToShoppingCart(value)}></Link></li>
																</ul>
															</div>
															<div className="text-center py-5 px-4">
																<span className="title d-block mb-2"><Link to={{ pathname: "/productDetail", state: { value } }}> {value.title} <span className="float-right"></span></Link></span>
																<span className="price d-block fwEbold"> Rs. {value.price - value.discount} </span>
																<span className={value.discount === 0 ? "" : "hotOffer green fwEbold text-uppercase text-white position-absolute d-block"}>{value.discount === 0 ? "" : "SALE"}</span>
															</div>
														</div>
													</div>
												)
											})
										}
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
								</article>
							</div>
							<div className="col-12 col-lg-3 order-lg-1">
								{/*<!-- sidebar -->*/}
								<aside id="sidebar">
									{/*<!-- widget -->*/}
									<section className="widget overflow-hidden mb-9">
										<form z className="searchForm position-relative border" onSubmit={this.handleSubmit}>
											<fieldset>
												<input type="search" className="form-control" placeholder="Search product..." onChange={this.handleChange}></input>
												<button className="position-absolute"><i className="icon-search"></i></button>
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
														<li className="mb-5 overflow-hidden" onClick={() => this.addCat(value.title)}><Link> {value.title} </Link></li>
													)
												})
											}
										</ul>
									</section>
									{/*<!-- widget -->*/}
									<section className="widget mb-9">
										<h3 className="headingVII fwEbold text-uppercase mb-6">Filter by price</h3>
										{/*<!-- filter ranger form -->*/}
										<ul className="list-unstyled categoryList mb-0">

											<li className="mb-5 overflow-hidden active" onClick={() => this.addPrice(0, 500)}><a href="javascript:void(0);">{"< 500"}</a></li>
											<li className="mb-5 overflow-hidden" onClick={() => this.addPrice(500, 1000)}><a href="javascript:void(0);">{"500 - 1000"}</a></li>
											<li className="mb-5 overflow-hidden" onClick={() => this.addPrice(1000, 2000)}><a href="javascript:void(0);">{"1000 - 2000"}</a></li>
											<li className="mb-5 overflow-hidden" onClick={() => this.addPrice(2000, 100000)}><a href="javascript:void(0);">{"> 2000"}</a></li>
											<li className="mb-5 overflow-hidden" onClick={() => this.addPrice(0, 0)}><a href="javascript:void(0);">{"All Prices"}</a></li>



										</ul>
									</section>
									{/*<!-- widget -->*/}
									{/* Add featured product like home later on */}
									{/* <section className="widget mb-9">
										<h3 className="headingVII fwEbold text-uppercase mb-6">Featured	</h3>
										<ul className="list-unstyled recentListHolder mb-0 overflow-hidden">
											<li className="mb-6 d-flex flex-nowrap">
												<div className="alignleft">
													<a href="shop-detail.html"><img src="http://placehold.it/70x80" alt="image description" className="img-fluid"></img></a>
												</div>
												<div className="description-wrap pl-1">
													<h4 className="headingVII mb-1"><a href="shop-detail.html">Vitamin C face wash</a></h4>
													<strong className="price fwEbold d-block;">21.00 $</strong>
												</div>
											</li>
											<li className="mb-6 d-flex flex-nowrap">
												<div className="alignleft">
													<a href="shop-detail.html"><img src="http://placehold.it/70x80" alt="image description" className="img-fluid"></img></a>
												</div>
												<div className="description-wrap pl-1">
													<h4 className="headingVII mb-1"><a href="shop-detail.html">Organic vegetables</a></h4>
													<strong className="price fwEbold d-block;">21.00 $</strong>
												</div>
											</li>
											<li className="mb-6 d-flex flex-nowrap">
												<div className="alignleft">
													<a href="shop-detail.html"><img src="http://placehold.it/70x80" alt="image description" className="img-fluid"></img></a>
												</div>
												<div className="description-wrap pl-1">
													<h4 className="headingVII mb-1"><a href="shop-detail.html">Organic cabbage</a></h4>
													<strong className="price fwEbold d-block;">21.00 $</strong>
												</div>
											</li>
											<li className="mb-6 d-flex flex-nowrap">
												<div className="alignleft">
													<a href="shop-detail.html"><img src="http://placehold.it/70x80" alt="image description" className="img-fluid"></img></a>
												</div>
												<div className="description-wrap pl-1">
													<h4 className="headingVII mb-1"><a href="shop-detail.html">Organic vegetables</a></h4>
													<strong className="price fwEbold d-block;">21.00 $</strong>
												</div>
											</li>
											<li className="d-flex flex-nowrap">
												<div className="alignleft">
													<a href="shop-detail.html"><img src="http://placehold.it/70x80" alt="image description" className="img-fluid"></img></a>
												</div>
												<div className="description-wrap pl-1">
													<h4 className="headingVII mb-1"><a href="shop-detail.html">Vitamin C face wash</a></h4>
													<strong className="price fwEbold d-block;">21.00 $</strong>
												</div>
											</li>
										</ul>
									</section> */}
									{/*<!-- widget -->*/}

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
export default Store;