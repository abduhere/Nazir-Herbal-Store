import React,{ Component } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";

class Home extends Component  {
	constructor() {
		super();
		this.state = {
			featured: [],
			currentUser: "",
			loggedIn: false
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

		var user = fireDatabase.auth().currentUser;
		if (user !== null) {
			this.setState({
				currentUser: user,
				loggedIn: true
			});
		}
	}

	handleTrack = () => {
		var orderId = document.getElementById("orderid").value;
		localStorage.setItem("nhsOrderId", orderId);
	}

    render() {
		return (
			<div>
				< Header shoppingCart = {this.props.shoppingCart} />
				<main>
					<section className="introBlock position-relative">
						<div className="slick-fade">
							<div>
								<div className="align w-100 d-flex align-items-center bgCover" style={{backgroundImage: 'url(./../assets/images/BgL/LG1.png)' }}>
									{/* <!-- holder --> */}
									<div className="container position-relative holder pt-xl-10 pt-0">
										{/* <!-- py-12 pt-lg-30 pb-lg-25 --> */}
										<div className="row">
											<div className="col-12 col-xl-7">
												<div className="txtwrap pr-lg-10">
													<h1 className="fwEbold position-relative pb-lg-8 pb-4 mb-xl-7 mb-lg-6">Nazir <span className="text-break d-block">Herbal Store</span></h1>
													<p className="mb-xl-15 mb-lg-10">A one of kind herbal medicine store for all your needs through<br></br>the comfort of your home</p>
													<Link to="/productList" className="btn btnTheme btnShop fwEbold text-white md-round py-md-3 px-md-4 py-2 px-3">Shop Now <i className="fas fa-arrow-right ml-2"></i></Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div className="align w-100 d-flex align-items-center bgCover" style={{backgroundImage: 'url(./../assets/images/BgL/G1.png)' }}>
									{/* <!-- holder --> */}
									<div className="container position-relative holder pt-xl-10 pt-0">
										{/* <!-- py-12 pt-lg-30 pb-lg-25 --> */}
										<div className="row">
											<div className="col-12 col-xl-7">
												<div className="txtwrap pr-lg-10">
													<span className="title d-block text-uppercase fwEbold position-relative pl-2 mb-lg-5 mb-sm-3 mb-1">Welcome to Nazir Herbal Store</span>
													<h2 className="fwEbold position-relative mb-xl-7 mb-lg-5">Cure  <span className="text-break d-block">Through Nature</span></h2>
													<p className="mb-xl-15 mb-lg-10">All our products are totally herbal without any side effects</p>
													<Link to="/productList" className="btn btnTheme btnShop fwEbold text-white md-round py-2 px-3 py-md-3 px-md-4">Shop Now <i className="fas fa-arrow-right ml-2"></i></Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div className="align w-100 d-flex align-items-center bgCover" style={{backgroundImage: 'url(/../assets/images/BgL/S3.png)' }}>
									{/* <!-- holder --> */}
									<div className="container position-relative holder pt-xl-10 pt-0">
										{/* <!-- py-12 pt-lg-30 pb-lg-25 --> */}
										<div className="row">
											<div className="col-12 col-xl-7">
												<div className="txtwrap pr-lg-10">
													<span className="title d-block text-uppercase fwEbold position-relative pl-2 mb-lg-5 mb-sm-3 mb-1">wellcome to Nazir Herbal Store</span>
													<h2 className="fwEbold position-relative mb-xl-7 mb-lg-5">Find your product and order now</h2>
													<p className="mb-xl-15 mb-lg-10">Nationwide free delivery*</p>
													<Link to="/productList" className="btn btnTheme btnShop fwEbold text-white md-round py-2 px-3 py-md-3 px-md-4">Shop Now <i className="fas fa-arrow-right ml-2"></i></Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="slickNavigatorsWrap">
							<a href="#" className="slick-prev"><i className="icon-leftarrow"></i></a>
							<a href="#" className="slick-next"><i className="icon-rightarrow"></i></a>
						</div>
					</section>
					{/* <!-- chooseUs-sec --> */}
					<section className="chooseUs-sec container pt-xl-22 pt-lg-20 pt-md-16 pt-10 pb-xl-12 pb-md-7 pb-2">
						<div className="row">
							<div className="col-12 col-lg-6 mb-lg-0 mb-4">
								<img src="./../assets/images/template.png" alt="" className="img-fluid"/>
							</div>
							<div className="col-12 col-lg-6 pr-4">
								<h2 className="headingII fwEbold playfair position-relative mb-6 pb-5">Why choose us ?</h2>
								<p className="mb-xl-14 mb-lg-10">Nazir Herbal Store is a one of kind online herbal store providing you all the herbal products (all are natural and without any side effects) in their best quality to your door step ...</p>
								{/* <!-- chooseList --> */}
								<ul className="list-unstyled chooseList">
									<li className="d-flex justify-content-start mb-xl-7 mb-lg-5 mb-3">
										<span className="icon icon-plant"></span>
										<div className="alignLeft d-flex justify-content-start flex-wrap">
											<h3 className="headingIII fwEbold mb-2">Hand Picked</h3>
											<p>All products are hand picked chosen from the best vendors to ensure quality</p>
										</div>
									</li>
									<li className="d-flex justify-content-start mb-xl-6 mb-lg-5 mb-4">
										<span className="icon icon-ic-plant"></span>
										<div className="alignLeft d-flex justify-content-start flex-wrap">
											<h3 className="headingIII fwEbold mb-2">Natural</h3>
											<p>All products are natural without any side effects as they contain herbal ingredients</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</section>
					{/* <!-- featureSec --> */}
					<section className="featureSec container-fluid overflow-hidden pt-xl-12 pt-lg-10 pt-md-80 pt-5 pb-xl-10 pb-lg-4 pb-md-2 px-xl-14 px-lg-7">
						{/* <!-- mainHeader --> */}
						<header className="col-12 mainHeader mb-7 text-center">
							<h1 className="headingIV playfair fwEblod mb-4">Featured Product</h1>
							<span className="headerBorder d-block mb-md-5 mb-3"><img src="./../assets/images/hbdr.png" alt="Header Border" className="img-fluid img-bdr"/></span>
							<p>Our featured products are best solution for your problems and priced at the lowest.</p>
						</header>
						<div className="col-12 p-0 overflow-hidden d-flex flex-wrap">
							{/* <!-- featureCol --> */}
							{
								this.state.featured.map(value => {
									return (
										<div className="featureCol px-3 position-relative mb-6">
											<div className="border">
												<div className="imgHolder position-relative w-100 overflow-hidden">
													<img src={value.image} alt="" className="img-fluid w-100"/>
													<ul className="list-unstyled postHoverLinskList d-flex justify-content-center m-0">
														<li className="mr-2 overflow-hidden"><Link className="icon-heart d-block" onClick= {() => {this.addToWishList(value)}}></Link></li>
														<li className="mr-2 overflow-hidden"><Link className="icon-cart d-block" onClick= {() => {this.props.addToShoppingCart(value)}}></Link></li>
														<li className="mr-2 overflow-hidden"><Link to={{pathname: "/productDetail", state: {value}}} className="icon-eye d-block"></Link></li>
													</ul>
												</div>
												<div className="text-center py-xl-5 py-sm-4 py-2 px-xl-2 px-1">
													<span className="title d-block mb-2"><Link to= {{pathname: "/productDetail", state: {value} }}> {value.title} </Link></span>
													<span className="price d-block fwEbold">Rs. {value.price - value.discount} </span>
													<span className={value.discount === 0 ? "" : "hotOffer green fwEbold text-uppercase text-white position-absolute d-block"}>{value.discount === 0 ? "" : "SALE"}</span>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>
					</section>
					{/* Order Tracking */}
					<section className="featureSec container-fluid overflow-hidden pt-xl-12 pt-lg-10 pt-md-80 pt-5 pb-xl-10 pb-lg-4 pb-md-2 px-xl-14 px-lg-7">
						{/* <!-- mainHeader --> */}
						<header className="col-12 mainHeader mb-7 text-center">
							<h1 className="headingIV playfair fwEblod mb-4">Order Tracking</h1>
							<span className="headerBorder d-block mb-md-5 mb-3"><i class="fas fa-truck-moving"></i></span>
							<p>To track your order please enter the order Id.</p>
						</header>
						{/*<!-- Order Id input -->*/}
						<div className="row">
							<div className="col-12">
								<div className="commentFormArea">
									<form className="commentform">
										<div className="form-group w-100 mb-5">
											<input id="orderid" className="form-control" placeholder="Order ID"></input>
										</div>
									</form>
								</div>
							</div>
						</div>
						<Link to="/orderDetail" className="btn btnTheme btnShop md-round fwEbold text-white py-3 px-4 py-md-3 px-md-4" onClick = {() => this.handleTrack()}> Track Order </Link>
					</section>
					{/* <!-- contactListBlock --> */}
					<div className="contactListBlock container overflow-hidden pt-xl-8 pt-lg-10 pt-md-8 pt-4 pb-xl-12 pb-lg-10 pb-md-4 pb-1">
						<div className="row">
							<div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
								{/* <!-- contactListColumn --> */}
								<div className="contactListColumn border overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
									<span className="icon icon-van"></span>
									<div className="alignLeft pl-2">
										<strong className="headingV fwEbold d-block mb-1">Free shipping order</strong>
										<p className="m-0">On orders over Rs. 100</p>
									</div>
								</div>
							</div>
							<div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
								{/* <!-- contactListColumn --> */}
								<div className="contactListColumn border overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
									<span className="icon icon-gift"></span>
									<div className="alignLeft pl-2">
										<strong className="headingV fwEbold d-block mb-1">Special gift card</strong>
										<p className="m-0">The perfect gift idea</p>
									</div>
								</div>
							</div>
							<div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
								{/* <!-- contactListColumn --> */}
								<div className="contactListColumn border overflow-hidden py-xl-5 py-md-3 py-2 px-xl-4 px-md-2 px-3 d-flex">
									<span className="icon icon-recycle"></span>
									<div className="alignLeft pl-2">
										<strong className="headingV fwEbold d-block mb-1">Return &amp; exchange</strong>
										<p className="m-0">Free return within 3 days</p>
									</div>
								</div>
							</div>
							<div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
								{/* <!-- contactListColumn --> */}
								<div className="contactListColumn border overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
									<span className="icon icon-call"></span>
									<div className="alignLeft pl-2">
										<strong className="headingV fwEbold d-block mb-1">Support 24 / 7</strong>
										<p className="m-0">Customer support</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
				< Footer />
			</div>
		);
    }
}

export default Home;