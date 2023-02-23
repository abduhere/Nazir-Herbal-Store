import React,{ Component } from "react";
import Header from "../components/headerA";
import Sidebar from "../components/sidebarA";
import { Link } from "react-router-dom";
import fireDatabase from "../firebase";
import firebase from "../firebase"
import Modal from 'react-modal'
Modal.setAppElement('#root')

class editProducts extends Component {
	constructor() {
		super();
		this.state = {
            id: [],
            details: [],
            summary: [],
            img: [],
            categ: [],
            showModal: false,
		};
	};

    handleUpdate = async () =>
    {
        var ref = fireDatabase.database().ref("products/" + String(this.props.location.state[1]));

        if(this.state.details.length != 0)
        {
            ref.update(
                {
                    "details": this.state.details
                }
            )
        }
        if(this.state.summary.length != 0)
        {
            ref.update(
                {
                    "summary": this.state.summary
                }
            )
        }
        if(this.state.categ.length != 0)
        {
            ref.update(
                {
                    "category": this.state.categ
                }
            )
        }

        if(this.state.img.length != 0)
        {

            const uploadTask = firebase.storage().ref(`images/products/`+ String(this.props.location.state[1])).put(this.state.img);
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
                firebase.storage().ref('images/products/'+ String(this.props.location.state[1])).getDownloadURL().then(
                    url => {
                        console.log("URL")
                        console.log(url)
                        ref.update(
                            {
                                "image": url
                            }
                        )
                    }
                )
            })
            
        }

        var d = Date.now()
        var d2 = new Date(d).toDateString()
        ref.update(
            {
                "updatedAt": d2
            }
        )

        this.setState({
            showModal: true
        })
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
            img: image
            });
        }
    };


    updateCategory = (event) =>
    {
        this.setState({
            categ: event.target.value
          });
    }

    handleID = (prod) =>{
        var ID = 0
        var ref = fireDatabase.database().ref("products");
        ref.on("value", function(snapshot){
            snapshot.forEach(value => {
                if(JSON.stringify(value.val()) === JSON.stringify(prod))
                {
                  console.log("KEY")
                  console.log(value.key)
                  ID = value.key
                }
            })
        })
        return ID
    }


    render() 
    { 
        const prod = this.props.location.state[0]
        console.log(this.props.location.state[1])

		return(
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
							<h3 className="headingVII fwEbold text-uppercase mb-5">The item has been edited!</h3>
							<div className='modal-Button'><button
								onClick={() => this.setState({showModal: false})}
								className="btn btnTheme btnShop fwEbold text-white md-round"
								>
								<i className="fas ml-2">
									{" "}
									OK!
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
                            <h2 className="page--title h5">Edit Products</h2>
                            {/*-- Page Title End -*/}

                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">Nazir Herbal Store</li>
                                <li className="breadcrumb-item"><Link to="/admin/products">Products</Link></li>
                                <li className="breadcrumb-item active"><span>Edit Products</span></li>
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
                            <h3 className="h3">Ecommerce Products <a href="#" className="btn btn-sm btn-outline-info">Edit Products</a></h3>
                        </div>
                    </div>
                    {/*-- Records Header End -*/}
                </div>
                
                <div className="panel">

                    {/*-- Edit Product Start -*/}
                    <div className="records--body">
                        <div className="title">
                            <h6 className="h6">Product Details</h6>
                        </div>

                        {/*-- Tabs Nav Start -*/}
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a href="#tab01" data-toggle="tab" className="nav-link active">Basic</a>
                            </li>
                            <li className="nav-item">
                                <a href="#tab03" data-toggle="tab" className="nav-link">Image</a>
                            </li>
                        </ul>
                        {/*-- Tabs Nav End -*/}

                        {/*-- Tab Content Start -*/}
                        <div className="tab-content">
                            {/*-- Tab Pane Start -*/}
                            <div className="tab-pane fade show active" id="tab01">
                                <form action="#">
                                    <div className="form-group row">
                                        <span className="label-text col-md-3 col-form-label">Product Name: </span>
                                        <div className="col-md-9">
                                            <b>{prod.title}</b>
                                        </div>
                                        <span className="label-text col-md-3 col-form-label">Product ID: </span>
                                        <div className="col-md-9">
                                            <b>{this.handleID(prod)}</b>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <span className="label-text col-md-3 col-form-label">Long Description:</span>
                                        <div className="col-md-9">
                                            <textarea name="textarea" className="form-control" onChange = {(event) => this.updateDetails(event)}></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <span className="label-text col-md-3 col-form-label" >Short Description:</span>

                                        <div className="col-md-9">
                                            <input type="text" name="text" className="form-control" onChange = {(event) => this.updateSumm(event)}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <span className="label-text col-md-3 col-form-label">Category:</span>

                                        <div className="col-md-9">
                                            <input type="text" name="text" className="form-control" onChange = {(event) => this.updateCategory(event)}/>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-9 offset-md-3">
                                            <Link to={{pathname: "/admin/editProducts" , state: [prod, this.props.location.state[1]]}}  className="btn btn-rounded btn-success" onClick = {() => this.handleUpdate()}> Update Product </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/*-- Tab Pane End -*/}

                            {/*-- Tab Pane Start -*/}
                            <div className="tab-pane fade" id="tab03">
                                <form action="#">
                                    <div className="form-group row">
                                        <span className="label-text col-md-3 col-form-label">Product Name:</span>
                                        <div className="col-md-9">
                                            <b>{prod.title}</b>
                                        </div>
                                    </div>

                                    <div class="panel">
                            <div class="panel-heading">
                                <h3 class="panel-title">Product Image</h3>
                            </div>

                            <div class="panel-content">
                                 <form action="#" id="dropzone01" className="dropzone" method="post" enctype="multipart/form-data">
                                    <div className="dz-message" data-dz-message ><input type="file" onChange={(event) => this.updateImg(event)}></input></div>
                                 </form>
                            </div>
                        </div>
                                    <div className="row mt-3">
                                        <div className="col-md-9 offset-md-3">
                                        <Link to={{pathname: "/admin/editProducts" , state: [prod, this.props.location.state[1]]}}  className="btn btn-rounded btn-success" onClick = {() => this.handleUpdate()}> Update Product </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/*-- Tab Pane End -*/}
                        </div>
                        {/*-- Tab Content End -*/}
                    </div>
                    {/*-- Edit Product End -*/}
                </div>
            </section>
            {/*-- Main Content End -*/}

            {/*-- Main Footer Start -*/}
            <footer className="main--footer main--footer-light">
                <p>Copyright &copy; <a href="#">Nazir Herbal Store</a>. All Rights Reserved.</p>
            </footer>
            {/*-- Main Footer End -*/}
        </main>
        {/*-- Main Container End -*/}
        </div>
        );
    }
}

export default editProducts;