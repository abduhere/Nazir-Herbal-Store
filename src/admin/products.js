import React, { Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";
import Modal from 'react-modal'
Modal.setAppElement('#root')

class products extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      product: [],
      Id: [],
      i: 0,
      searchTerm: "",
      value: "",
      num: 0,
      tobeDel: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      searchTerm: this.state.value
    });

    //console.log(this.state.value);
  }

  handleDelete(v)
  {
      this.setState({
        showModal: true,
        tobeDel: v
        })
      
  }

  handleDelete2(v)
  {
    var ref = fireDatabase.database().ref("products");
    this.setState({
      showModal: false,
    })
    ref.on("value", function(snapshot){
        snapshot.forEach(value => {
            if(JSON.stringify(value.val()) === JSON.stringify(v))
            {
              value.ref.remove()
            }
        })
    })
    this.setState({
      tobeDel: []
    })
      
  }

  componentDidMount = () => {
    var ref = fireDatabase.database().ref("products/");
    var num = 0
    ref.on("value", function(snapshot) {
        num = snapshot.numChildren() + 1
      })
    this.setState({
        num: num
    })
    ref.on("value", snapshot => {
      var prod = [];
      var id = [];
      snapshot.forEach(value => {
        prod.push(value.val());
        id.push(value.key);
      });

      this.setState({
        product: prod,
        Id: id
      });
    });
  };

  render() {
    this.state.i = 0
    return (
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
					marginBottom: 'auto'}}
					
				}>
					<div>
						<section className="modal-main">
							<h3 className="headingVII fwEbold text-uppercase mb-5">Are you sure you want to delete?</h3>
							<div className='modal-Button'><button
								onClick={() => this.handleDelete2(this.state.tobeDel)}
								className="btn btnTheme btnShop fwEbold text-white md-round"
								>
								<i className="fas ml-2">
									{" "}
									Yes
								</i>
								</button>
                <button
								onClick={() => this.setState({showModal: false})}
								className="btn btnTheme btnShop fwEbold text-white md-round"
								>
								<i className="fas ml-2">
									{" "}
									No!
								</i>
								</button>
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
                  {/*-- Page Title Start -*/}
                  <h2 className="page--title h5">Products</h2>
                  {/*-- Page Title End -*/}

                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      <span>Products</span>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-6">
                  {/*-- Summary Widget Start -*/}

                  {/*-- Summary Widget End -*/}
                </div>
              </div>
            </div>
          </section>
          {/*-- Page Header End -*/}

          {/*-- Main Content Start -*/}
          <section className="main--content">
            <div className="panel">
              {/*-- Records Header Start -*/}
              <div className="records--header">
                <div className="title fa-shopping-bag">
                  <h3 className="h3">
                    Products{" "}
                    <a href="#" className="btn btn-sm btn-outline-info">
                      Manage Products
                    </a>
                  </h3>
                  <p>Found Total {this.state.product.length} Products</p>
                </div>

                <div className="actions">
                  <form
                    action="#"
                    className="search flex-wrap flex-md-nowrap"
                    onSubmit={this.handleSubmit}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder=" Product Name..."
                      onChange={this.handleChange}
                    />
                    {/* <select name="select" className="form-control">
                                        <option value="" selected>Product Category</option>
                                    </select> */}
                    <button type="submit" className="btn btn-rounded">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                  <Link
                    to="/admin/addProducts"
                    className="addProduct btn btn-lg btn-rounded btn-warning"
                  >
                    Add Product
                  </Link>
                </div>
              </div>
              {/*-- Records Header End -*/}
            </div>

            <div className="panel">
              {/*-- Records List Start -*/}
              <div className="records--list" data-title="Product Listing">
                <table id="recordsListView">
                  <thead>
                    <tr>
                      <th>Product Number</th>
                      <th className="not-sortable">Image</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Created Date</th>
                      <th className="not-sortable">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {this.state.product
                      .filter(value => {
                        this.state.i = 0
                        console.log(this.state.searchTerm);
                        if (this.state.searchTerm === "") {
                          return value;
                        } else if (
                          value.title
                            .toLowerCase()
                            .includes(this.state.searchTerm.toLowerCase())
                        ) {
                          return value;
                        }
                      })
                      .map((value, index) => {
                        this.state.i = this.state.i + 1;
                        return (
                          <tr>
                            <td>{this.state.i}</td>
                            <td>
                              <img
                                src={value.image}
                                alt=""
                                width="60"
                                height="80"
                              />
                            </td>
                            <td>{value.title}</td>
                            <td>{value.category}</td>
                            <td>{value.price}</td>
                            <td>{value.stockUnits}</td>
                            <td>{value.createdAt}</td>
                            <td>
                              <div className="dropleft">
                                <a
                                  href="#"
                                  className="btn-link"
                                  data-toggle="dropdown"
                                >
                                  <i className="fa fa-ellipsis-v"></i>
                                </a>
                                <div className="dropdown-menu">
                                  <Link
                                    to={{
                                      pathname: "/admin/editProducts",
                                      state: [value, this.state.Id[this.state.i - 1]]
                                    }}
                                    className="dropdown-item"
                                  >
                                    Edit
                                  </Link>
                                  <Link to="/admin/products" className="dropdown-item" onClick ={()=>this.handleDelete(value)} >
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {/*-- Records List End -*/}
            </div>
          </section>
          {/*-- Main Content End -*/}

          <div>
          {/*-- Main Footer Start -*/}
          <footer className="main--footer main--footer-transparent">
                            <p>2021 &copy; <a href="#">Nazir Herbal Store</a>. All Rights Reserved.</p>
          </footer>
          </div>
          {/*-- Main Footer End -*/}
        </main>
        {/*-- Main Container End -*/}
      </div>
    );
  }
}

export default products;
