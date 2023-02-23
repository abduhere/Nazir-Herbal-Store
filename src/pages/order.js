import React, { Component } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";

class Order extends Component {
  constructor() {
    super();
    this.state = {
      featured: [],
      featuredImages: [],
      orderId: ""
    };
  }

  componentDidMount() {
    var orderNum = JSON.parse(localStorage.getItem("orderId"));
    this.setState({
      orderId: orderNum
    });

    var ref = fireDatabase.database().ref("products");
    ref
      .orderByChild("feature")
      .equalTo("yes")
      .limitToFirst(5)
      .on("value", snapshot => {
        var featuredList = [];
        snapshot.forEach(value => {
          featuredList.push(value.val());
        });
        this.setState({
          featured: featuredList
        });
      });
  }

  render() {
    return (
      <div>
        <Header shoppingCart = {this.props.shoppingCart} />
        <main>
          <section className="introBlock position-relative">
            <div className="slick-fade">
              <div>
                <div
                  className="align w-100 d-flex align-items-center bgCover"
                  style={{
                    backgroundImage: "url(./../assets/images/BgL/LG1.png)"
                  }}
                >
                  {/* <!-- holder --> */}
                  <div className="container position-relative holder pt-xl-10 pt-0">
                    {/* <!-- py-12 pt-lg-30 pb-lg-25 --> */}
                    <div className="row">
                      <div className="col-12 col-xl-7">
                        <div className="txtwrap pr-lg-10">
                          <h1 className="fwEbold position-relative pb-lg-8 pb-4 mb-xl-7 mb-lg-6">
                            Your Order Has Been Placed!{" "}
                          </h1>
                          <div>
                            <span className="text-break d-block">
                              Order Id: {this.state.orderId}
                            </span>
                          </div>

                          <p></p>
                          <Link
                            to="/store"
                            className="btn btnTheme btnShop fwEbold text-white md-round py-md-3 px-md-4 py-2 px-3"
                          >
                            <i className="fas fa-arrow-left ml-2">
                              {" "}
                              Back To Shopping Healthy!
                            </i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- chooseUs-sec --> */}

          {/* <!-- featureSec --> */}
          <section className="featureSec container-fluid overflow-hidden pt-xl-12 pt-lg-10 pt-md-80 pt-5 pb-xl-10 pb-lg-4 pb-md-2 px-xl-14 px-lg-7">
            {/* <!-- mainHeader --> */}
            <header className="col-12 mainHeader mb-7 text-center">
              <h1 className="headingIV playfair fwEblod mb-4">
                Featured Product
              </h1>
              <span className="headerBorder d-block mb-md-5 mb-3">
                <img
                  src="./../assets/images/hbdr.png"
                  alt="Header Border"
                  className="img-fluid img-bdr"
                />
              </span>
              <p>
                Our featured products are best solution for your problems and
                priced at the lowest.
              </p>
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
														<li className="mr-2 overflow-hidden"><Link to= "#" className="icon-heart d-block"></Link></li>
														<li className="mr-2 overflow-hidden"><Link to= "#" className="icon-cart d-block" onClick= {() => {this.props.addToShoppingCart(value)}}></Link></li>
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
          {/* <!-- contactListBlock --> */}
          <div className="contactListBlock container overflow-hidden pt-xl-8 pt-lg-10 pt-md-8 pt-4 pb-xl-12 pb-lg-10 pb-md-4 pb-1">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
                {/* <!-- contactListColumn --> */}
                <div className="contactListColumn border overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
                  <span className="icon icon-van"></span>
                  <div className="alignLeft pl-2">
                    <strong className="headingV fwEbold d-block mb-1">
                      Free shipping order
                    </strong>
                    <p className="m-0">On orders over Rs. 100</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
                {/* <!-- contactListColumn --> */}
                <div className="contactListColumn border overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
                  <span className="icon icon-gift"></span>
                  <div className="alignLeft pl-2">
                    <strong className="headingV fwEbold d-block mb-1">
                      Special gift card
                    </strong>
                    <p className="m-0">The perfect gift idea</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
                {/* <!-- contactListColumn --> */}
                <div className="contactListColumn border overflow-hidden py-xl-5 py-md-3 py-2 px-xl-4 px-md-2 px-3 d-flex">
                  <span className="icon icon-recycle"></span>
                  <div className="alignLeft pl-2">
                    <strong className="headingV fwEbold d-block mb-1">
                      Return &amp; exchange
                    </strong>
                    <p className="m-0">Free return within 3 days</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
                {/* <!-- contactListColumn --> */}
                <div className="contactListColumn border overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
                  <span className="icon icon-call"></span>
                  <div className="alignLeft pl-2">
                    <strong className="headingV fwEbold d-block mb-1">
                      Support 24 / 7
                    </strong>
                    <p className="m-0">Customer support</p>
                  </div>
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

export default Order;
