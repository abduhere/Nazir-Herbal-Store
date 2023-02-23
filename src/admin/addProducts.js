import React,{ Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";
import firebase from "../firebase";
import Modal from 'react-modal'
Modal.setAppElement('#root')



class addProducts extends Component {
	constructor() {
		super();
		this.state = {
            details: [],
            summary: [],
            image: [],
            title: [],
            category: [],
            createdAt: [],
            discount: [],
            feature: [],
            price: [],
            publishedAt: [],
            stockUnits: [],
            updatedAt: [],
            showModal: false,

		};
	};

    handleUpdate = async () =>
    {
        var ref = fireDatabase.database().ref("products");
        var num = 0
        ref.on("value", function(snapshot) {
            num = snapshot.numChildren() + 1
          })
        var d = Date.now()
        var d2 = new Date(d).toDateString()
        this.setState(
            {
                updatedAt : d2,
                createdAt: d2,
                publishedAt: d2
            }
        )

        const uploadTask = firebase.storage().ref(`images/products/` + String(num)).put(this.state.image);
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
                firebase.storage().ref('images/products/' + String(num)).getDownloadURL().then(
                    url => {
                        this.setState(
                            {
                                image : url
                            }
                        )
                        this.setState({
                            showModal: []   
                        })
                        fireDatabase.database().ref("products").push(this.state)
                        this.setState({
                            showModal: true
                        })
                    }
                )
            })
    }
    
    updateUnits = (event) =>
    {
        this.setState({
            stockUnits: event.target.value
          });
    }

    updateFeature = (event) =>
    {
        this.setState({
            feature: event.target.value
          });
    }

    updatePrice = (event) =>
    {
        this.setState({
            price: event.target.value
          });
    }

    updateDiscount = (event) =>
    {
        this.setState({
            discount: event.target.value
          });
    }

    updateCategory = (event) =>
    {
        this.setState({
            category: event.target.value
          });
    }

    updateTitle = (event) =>
    {
        this.setState({
            title: event.target.value
          });
    }

    updateDetails = (event) =>
    {
        this.setState({
            details: event.target.value
          });
    }

    updateSumm = (event) =>
    {
        this.setState({
            summary: event.target.value
          });
    }

    updateImg = (event) =>
    {
        if (event.target.files && event.target.files[0]) {
            let image = event.target.files[0];
            this.setState({
            image: image
            });
        }
    };

    render() 
    { 
		return(
        <div>
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
                    <h3 className="headingVII fwEbold text-uppercase mb-5">The item has been added!</h3>
                    <div className='modal-Button'><button
                        onClick={() => this.setState({showModal: false})}
                        className="btn btnTheme btnShop fwEbold text-white md-round"
                        >
                        <i className="fas ml-2">
                            {" "}
                            Back to the list!
                        </i>
                        </button>
                    </div>
                </section>
            </div>
        </Modal>
        <Header />
            
        <Sidebar />
        {/*-- Main Container Start -*/}
        <main className="main--container">
            {/*-- Page Header Start -*/}
            <section className="page--header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            {/*-- Page Title Start -*/}
                            <h2 className="page--title h5">Blank Page</h2>
                            {/*-- Page Title End -*/}

                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">Nazir Herbal Store</li>
                                <li className="breadcrumb-item"><Link to="products">Products</Link></li>

                                <li className="breadcrumb-item active"><span>Add Products</span></li>
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
                <div className="row gutter-20">
                    <div className="col-md-6">

                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Product Details</h3>

                                {/* <div className="dropdown">
                                    <button type="button" className="btn-link dropdown-toggle" data-toggle="dropdown">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </button>

                                    <ul className="dropdown-menu">
                                        <li><a href="#"><i className="far fa-circle"></i>Panel Option 1</a></li>
                                        <li><a href="#"><i className="far fa-circle"></i>Panel Option 2</a></li>
                                        <li><a href="#"><i className="far fa-circle"></i>Panel Option 3</a></li>
                                    </ul>
                                </div> */}
                            </div>
                                <div className="panel-content">
                                <div className="form-group row">
                                    <span className="label-text col-lg-3 col-form-label" >Product Name</span>

                                    <div className="col-lg-9">
                                        <input type="text" name="title" placeholder="Enter Product Name/Title ..." className="form-control" required onChange = {(event) => this.updateTitle(event)}/>
                                        {/*<span className="form-text text-muted">Example block-level help text here.</span>*/}
                                    </div>
                                </div>

                                <div className="form-group row mt-4">
                                    <span className="label-text col-lg-3 col-form-label">Details</span>

                                    <div className="col-lg-9">
                                        <input type="text" name="summary" placeholder="Enter Product Details..." className="form-control" required onChange = {(event) => this.updateDetails(event)}/>
                                    </div>
                                </div>

                                <div className="form-group row mt-4">
                                    <span className="label-text col-lg-3 col-form-label">Summary</span>

                                    <div className="col-lg-9">
                                        <input type="text" name="summary" placeholder="Enter Product Summary..." className="form-control" required onChange = {(event) => this.updateSumm(event)}/>
                                    </div>
                                </div>
                                <div className="form-group row mt-4">
                                    <span className="label-text col-lg-3 col-form-label">Category</span>

                                    <div className="col-lg-9">
                                        <input type="text" name="category" placeholder="Enter Product Category Title..." className="form-control" required onChange = {(event) => this.updateCategory(event)}/>
                                    </div>
                                </div>
                                 <div className="form-group row mt-4">
                                    <span className="label-text col-lg-3 col-form-label">Price</span>

                                    <div className="col-lg-9">
                                        <input type="number" name="price" placeholder="Enter Price in PKR " className="form-control" required onChange = {(event) => this.updatePrice(event)}/>
                                    </div>
                                </div>
                                    <div className="form-group row mt-4">
                                    <span className="label-text col-lg-3 col-form-label">Discount</span>

                                    <div className="col-lg-9">
                                        <input type="number" name="discount" placeholder="Enter Discount in PKR " className="form-control" required onChange = {(event) => this.updateDiscount(event)}/>
                                    </div>
                                </div>
                                 <div className="form-group row mt-4">
                                    <span className="label-text col-lg-3 col-form-label">Quantity</span>

                                    <div className="col-lg-9">
                                        <input type="number" name="quantity" placeholder="Enter Number Of Units" className="form-control" required onChange = {(event) => this.updateUnits(event)}/>
                                    </div>
                                </div>

                                <div className="form-group row mt-4">
                                    <span className="label-text col-lg-3 col-form-label">Feature</span>

                                    <div className="col-lg-9">
                                        <input type="text" name="quantity" placeholder="Do you want it to be featured?" className="form-control" required onChange = {(event) => this.updateFeature(event)}/>
                                    </div>
                                </div>


                            </div>


                        </div>
                        
                    </div>
                    
                    <div className="col-md-6">
                        {/*-- Panel Start -*/}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Product Image</h3>
                            </div>

                            <div className="panel-content">
                                 <form action="#" id="dropzone01" className="dropzone" method="post" enctype="multipart/form-data">
                                 <div className="dz-message" data-dz-message ><input type="file" onChange={(event) => this.updateImg(event)}></input></div>
                                 </form>
                            </div>
                        </div>
                        {/*-- Panel End -*/}
                    </div>
                </div>
                <div className="m-account--actions">
                    <Link to="/admin/products" className="btn btn-block btn-rounded btn-info" onClick= {() => this.handleUpdate()}> Add Product </Link>
                    <Link to ="/admin/products"><button type="button" className="btn btn-block btn-rounded btn-outline-secondary mx-2">Cancel</button></Link>
                </div>
            </section>

            {/*-- Main Content End -*/}

            {/*-- Main Footer Start -*/}
            <div>
            <footer classNameName="main--footer main--footer-transparent">
                <p>Copyright &copy; <a href="#">Nazir Herbal Store</a>. All Rights Reserved.</p>
            </footer>
            </div>
            {/*-- Main Footer End -*/}
        </main>
        {/*-- Main Container End -*/}
        </div>
        </div>
        );
    }
}

export default addProducts;