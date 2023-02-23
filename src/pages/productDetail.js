import React,{ Component } from "react";
import { NavLink, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import fireDatabase from "../firebase";

class Home extends Component {
	constructor () {
		super();
		this.state = {
			relatedProducts: [],
			wishList: JSON.parse(localStorage.getItem("nhsWishList") || "[]")
		};
	};

	componentDidMount = () => {
		var ref =  fireDatabase.database().ref("products");
		ref.orderByChild("category").equalTo(this.props.location.state.value.category).limitToFirst(4).on("value", snapshot => {
			var relatedProducts = []
			snapshot.forEach(value => {
				relatedProducts.push(value.val())
			});
			this.setState({
				relatedProducts: relatedProducts
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

    render() {  
		const product = this.props.location.state;
		console.log(product);
		return (
			<div>
				< Header shoppingCart = {this.props.shoppingCart} />
				<main>
					{/* <!-- introBannerHolder --> */}
					<section className="introBannerHolder d-flex w-100 bgCover" style={{backgroundImage: "url(./../assets/images/1263x300.png)"}}>
						<div className="container">
							<div className="row">
								<div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
									<h1 className="headingIV fwEbold playfair mb-4">Store</h1>
									<ul className="list-unstyled breadCrumbs d-flex justify-content-center">
										<li className="mr-2"><Link to="/">Home</Link></li>
										<li className="mr-2">/</li>
										<li className="mr-2"><Link to="/store">Store</Link></li>
										<li className="mr-2">/</li>
										<li className="active"> {product.value.title} </li>
									</ul>
								</div>
							</div>
						</div>
					</section>
					{/* <!-- twoColumns --> */}
					<div className="twoColumns container pt-xl-23 pb-xl-20 pt-lg-20 pb-lg-20 py-md-16 py-10">
						<div className="row mb-6">
							<div className="col-12 col-lg-6 order-lg-1">
								{/* <!-- productSliderImage --> */}
								<div className="imgHolder mb-lg-0 mb-4">
									<div>
										<img src={product.value.image} alt="" className="img-fluid w-100"></img>
									</div>
								</div>
							</div>
							<div className="col-12 col-lg-6 order-lg-3">
								{/* <!-- productTextHolder --> */}
								<div className="productTextHolder overflow-hidden">
									<h2 className="fwEbold mb-2"> {product.value.title} <span className="float-right"></span></h2>
									<ul className="list-unstyled ratingList d-flex flex-nowrap mb-2">
										<li className="mr-2"><a href="javascript:void(0);"><i className="fas fa-star"></i></a></li>
										<li className="mr-2"><a href="javascript:void(0);"><i className="fas fa-star"></i></a></li>
										<li className="mr-2"><a href="javascript:void(0);"><i className="fas fa-star"></i></a></li>
										<li className="mr-2"><a href="javascript:void(0);"><i className="fas fa-star"></i></a></li>
										<li className="mr-2"><a href="javascript:void(0);"><i className="far fa-star"></i></a></li>
										<li>( 5 customer reviews )</li>
									</ul>
									<strong className="price d-block mb-5 text-green"><del>{product.value.discount === 0 ? "" : product.value.price}</del> Rs. {product.value.price - product.value.discount} </strong>
									<p className="mb-5">{product.value.summary}</p>
									<ul className="list-unstyled productInfoDetail mb-5 overflow-hidden">
										<li className="mb-2">Category: <span>{product.value.category}</span></li>
										<li className="mb-2">Quantity: <span>{product.value.stockUnits}</span></li>
										<li className="mb-2">Discount: <span>{product.value.discount === 0 ? "Not Applicable" : product.value.discount}</span></li>
									</ul>
									<ul className="list-unstyled sizeList d-flex flex-wrap mb-4">
										<li className="text-uppercase mr-6">Packing:</li>
										<span className="fake-label">All our products come in standart 100g packaging.</span>
										{/* <li className="mr-2">
											<label htmlFor="check-1">
												<input id="check-1"  type="checkbox"></input>
												<span className="fake-input"></span>
												<span className="fake-label">20g</span>
											</label>
										</li>
										<li className="mr-2">
											<label htmlFor="check-2">
												<input id="check-2" type="checkbox"></input>
												<span className="fake-input"></span>
												<span className="fake-label">50g</span>
											</label>
										</li>
										<li className="mr-2">
											<label htmlFor="check-3">
												<input id="check-3" type="checkbox"></input>
												<span className="fake-input"></span>
												<span className="fake-label">100g</span>
											</label>
										</li>
										<li className="mr-2">
											<label htmlFor="check-4">
												<input id="check-4" type="checkbox"></input>
												<span className="fake-input"></span>
												<span className="fake-label">120g</span>
											</label>
										</li>
										<li className="mr-2">
											<label htmlFor="check-5">
												<input id="check-5" type="checkbox"></input>
												<span className="fake-input"></span>
												<span className="fake-label">500g</span>
											</label>
										</li> */}
									</ul>
									<div className="holder overflow-hidden d-flex flex-wrap mb-6">
										<input type="number" placeholder="1"></input>
										<Link to={{pathname: "/productDetail", state: product}} className="btn btnTheme btnShop fwEbold text-white md-round py-3 px-4 py-md-3 px-md-4" onClick= {() => this.props.addToShoppingCart(product.value)}> Add To Cart <i className="fas fa-arrow-right ml-2"></i></Link>
									</div>
									<ul className="list-unstyled socialNetwork d-flex flex-wrap mb-sm-11 mb-4">
										<li className="text-uppercase mr-5">SHARE THIS PRODUCT:</li>
										<li className="mr-4"><a href="javascript:void(0);" className="fab fa-facebook-f"></a></li>
										<li className="mr-4"><a href="javascript:void(0);" className="fab fa-google-plus-g"></a></li>
										<li className="mr-4"><a href="javascript:void(0);" className="fab fa-twitter"></a></li>
										<li className="mr-4"><a href="javascript:void(0);" className="fab fa-pinterest-p"></a></li>
									</ul>
									<ul className="list-unstyled productInfoDetail mb-0">
										<li>Brand: <Link to= "/"> Nazir Herbal Store </Link></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-12">
								{/* <!-- tabSetList --> */}
								<ul className="list-unstyled tabSetList d-flex justify-content-center mb-9">
									<li className="mr-md-20 mr-sm-10 mr-2">
										<a href="#tab1-0" className="active playfair fwEbold pb-2">Description</a>
									</li>
									{/* <li>
										<a href="#tab2-0" className="playfair fwEbold pb-2">Reviews ( 2 )</a>
									</li> */}
								</ul>
								{/* <!-- tab-content --> */}
								<div className="tab-content mb-xl-11 mb-lg-10 mb-md-8 mb-5">
									<div id="tab1-0" className="active">
										<p> {product.value.details} .</p>
									</div>
									{/* <div id="tab2-0">
										<p>Aenean id ullamcorper libero. Vestibulum imperdiet nibh. Lorem ullamcorper volutpat. Vestibulum lacinia risus. Etiam sagittis ullamcorper volutpat. Vestibulum lacinia risus sed ligula malesuada volutpat.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
									</div> */}
								</div>
							</div>
						</div>
					</div>
					{/* <!-- RelatedSec --> */}
					<section className="featureSec container overflow-hidden pt-xl-12 pb-xl-29 pt-lg-10 pb-lg-14 pt-md-8 pb-md-10 py-5">
						<div className="row">
							{/* <!-- mainHeader --> */}
							<header className="col-12 mainHeader mb-5 text-center">
								<h1 className="headingIV playfair fwEblod mb-4">Related products</h1>
							</header>
						</div>
						<div className="row">
							{
								this.state.relatedProducts.map((value, index) => {
									return (
										// {/* <!-- RelatedCol --> */}
										<div className="col-12 col-sm-6 col-lg-3 featureCol position-relative mb-7" key= {index}>
											<div className="border">
												<div className="imgHolder position-relative w-100 overflow-hidden">
													<img src={value.image} alt="" className="img-fluid w-100"></img>
													<ul className="list-unstyled postHoverLinskList d-flex justify-content-center m-0">
														<li className="mr-2 overflow-hidden"><Link to= {{pathname: "/productDetail", state: {value} }} className="icon-heart d-block" onClick= {() => this.addToWishList(value)}></Link></li>
														<li className="mr-2 overflow-hidden"><Link to= "#" className="icon-cart d-block" onClick= {() => this.props.addToShoppingCart(value)}></Link></li>
														<li className="mr-2 overflow-hidden"><Link to= {{pathname: "/productDetail", state: {value} }} className="icon-eye d-block"></Link></li>
													</ul>
												</div>
												<div className="text-center py-5 px-4">
													<span className="title d-block mb-2"><Link to= {{pathname: "/productDetail", state: {value} }}> {value.title} </Link></span>
													<span className="price d-block fwEbold"> Rs. {value.price - value.discount} </span>
													<span className={value.discount === 0 ? "" : "hotOffer green fwEbold text-uppercase text-white position-absolute d-block"}>{value.discount === 0 ? "" : "SALE"}</span>
												</div>
											</div>
										</div>
									);
								})
							}
						</div>
					</section>
				</main>
				< Footer />
			</div>
		);
    }
}
  
  export default Home;