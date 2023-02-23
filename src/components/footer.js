import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      // {/*<!-- footerHolder -->*/}
      <div>
        <aside className="footerHolder overflow-hidden bg-lightGray pt-xl-23 pb-xl-8 pt-lg-10 pb-lg-8 pt-md-12 pb-md-8 pt-10">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-4 mb-lg-0 mb-4">
                <h3 className="headingVI fwEbold text-uppercase mb-7">Contact Us</h3>
                <ul className="list-unstyled footerContactList mb-3">
                  <li className="mb-3 d-flex flex-nowrap pr-xl-20 pr-0"><span className="icon icon-place mr-3"></span> <address className="fwEbold m-0">Address: Store coming soon.</address></li>
                  <li className="mb-3 d-flex flex-nowrap"><span className="icon icon-phone mr-3"></span> <span className="leftAlign">Whatsapp/Phone : <a href="javascript:void(0);">(+92) 304 4832874</a></span></li>
                  <li className="email d-flex flex-nowrap"><span className="icon icon-email mr-2"></span> <span className="leftAlign">Email:  <a href="javascript:void(0);">nazirherbalstore@gmail.com</a></span></li>
                </ul>
                <ul className="list-unstyled followSocailNetwork d-flex flex-nowrap">
                  <li className="fwEbold mr-xl-11 mr-md-8 mr-3">Follow  us:</li>
                  <li className="mr-xl-6 mr-md-5 mr-2"><a href="javascript:void(0);" className="fab fa-facebook-f"></a></li>
                  <li className="mr-xl-6 mr-md-5 mr-2"><a href="javascript:void(0);" className="fab fa-twitter"></a></li>

                </ul>
              </div>
              {/* <div className="col-12 col-sm-6 col-lg-3 pl-xl-14 mb-lg-0 mb-4">
                <h3 className="headingVI fwEbold text-uppercase mb-6">Information</h3>
                <ul className="list-unstyled footerNavList">
                  <li className="mb-1"><a href="javascript:void(0);">New Products</a></li>
                  <li className="mb-2"><a href="javascript:void(0);">Top Sellers</a></li>
                  <li className="mb-2"><a href="javascript:void(0);">Our Blog</a></li>
                  <li className="mb-2"><a href="javascript:void(0);">About Our Shop</a></li>
                  <li><a href="javascript:void(0);">Privacy policy</a></li>
                </ul>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 pl-xl-12 mb-lg-0 mb-4">
                <h3 className="headingVI fwEbold text-uppercase mb-7">My Account</h3>
                <ul className="list-unstyled footerNavList">
                  <li className="mb-1"><a href="javascript:void(0);">My account</a></li>
                  <li className="mb-2"><a href="javascript:void(0);">Discount</a></li>
                  <li className="mb-2"><a href="javascript:void(0);">Orders history</a></li>
                  <li><a href="javascript:void(0);">Personal information</a></li>
                </ul>
              </div>
              <div className="col-12 col-sm-6 col-lg-2 pl-xl-18 mb-lg-0 mb-4">
                <h3 className="headingVI fwEbold text-uppercase mb-5">PRODUCTS</h3>
                <ul className="list-unstyled footerNavList">
                  <li className="mb-2"><a href="javascript:void(0);">Delivery</a></li>
                  <li className="mb-2"><a href="javascript:void(0);">Legal notice</a></li>
                  <li className="mb-2"><a href="javascript:void(0);">Prices drop</a></li>
                  <li className="mb-2"><a href="javascript:void(0);">New products</a></li>
                  <li><a href="javascript:void(0);">Best sales</a></li>
                </ul>
              </div> */}
            </div>
          </div>
        </aside>
        <footer id="footer" className="container-fluid overflow-hidden px-lg-20">
          <div className="copyRightHolder text-center pt-lg-5 pb-lg-4 py-3">
            <p className="mb-0">Coppyright 2021 by <Link to="/">Nazir Herbal Store</Link> - All right reserved</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;