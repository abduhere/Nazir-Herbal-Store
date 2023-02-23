import React, { useState } from "react";
import fireDatabase from "./firebase";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import ProductList from "./pages/productList";
import Cart from "./pages/cart";
import Feedback from "./pages/feedback";
import Profile from "./pages/profile";
import OrderHistory from "./pages/orderHistory";
import Store from "./pages/store";
import ProductDetail from "./pages/productDetail";
import Order from "./pages/order";
import OrderDetail from "./pages/orderDetail"
import login from "./pages/login";
import register from "./pages/register";
import adminHome from "./admin/adminHome";
import addAdmin from "./admin/addAdmin";
import adminLogin from "./admin/adminLogin";
import adminManagement from "./admin/adminManagement";
import approve_orders from "./admin/approve_orders";
import adminFeedback from "./admin/feedback";
import invoice from "./admin/invoice"
import adminOrders from "./admin/orders"
import adminOrderView from "./admin/orderView";
import superAdminHome from "./admin/superAdminHome";
import products from "./admin/products";
import editProducts from "./admin/editProducts"
import addProducts from  "./admin/addProducts"

function App() {
  const [shoppingCart, setShoppingCart] = useState(JSON.parse(localStorage.getItem("nhsCart") || "[]"));
  const [cartTotal, setCartTotal] = useState(() => {
    var total = 0
    shoppingCart.forEach(value => {
      total = total + value.price;
    });

    return total;
  });

  const addToShoppingCart = (item) => {
		var counter = true;
		var cart = shoppingCart;

		cart.forEach(value => {
			if (value.title === item.title) {
				value.quantity = value.quantity + 1;
				counter = false;
			};
		});

		if (counter === true) {
			item.quantity = 1;
			cart.push(item);
		};

    var total = 0
    shoppingCart.forEach(value => {
      total = total + value.price - value.discount;
    });

    setCartTotal(total);
		setShoppingCart(cart);

		localStorage.setItem("nhsCart", JSON.stringify(shoppingCart));
	}
  
  const removeItem = (item) => {
    var cart = shoppingCart;
    var index = cart.indexOf(item);
    cart.splice(index, 1);
    
    var total = 0
    shoppingCart.forEach(value => {
      total = total + value.price - value.discount;
    });

    setCartTotal(total);
    setShoppingCart(cart);

    localStorage.setItem("nhsCart", JSON.stringify(shoppingCart));
  }

  const emptyCart = () => {
    setShoppingCart(JSON.parse(localStorage.getItem("nhsCart") || "[]"));
  }
  
  return (
    <div id="pageWrapper">
      <Router>
        <Switch>

          {/* Client Side */}
          <Route exact path="/" render = {(props) => <Home {... props} shoppingCart = {shoppingCart} addToShoppingCart = {addToShoppingCart} /> } />
          <Route exact path="/login" component={login} />
          <Route exact path="/register" component={register} />
          <Route exact path="/store" render = {(props) => <Store {... props} shoppingCart = {shoppingCart} addToShoppingCart = {addToShoppingCart} /> } />
          <Route exact path="/productList" render = {(props) => <ProductList {... props} shoppingCart = {shoppingCart} addToShoppingCart = {addToShoppingCart} /> } />
          <Route exact path="/productDetail" render = {(props) => <ProductDetail {... props} shoppingCart = {shoppingCart} addToShoppingCart = {addToShoppingCart} /> } />
          <Route exact path="/cart" render = {(props) => <Cart {... props} shoppingCart = {shoppingCart} removeItem = {removeItem} emptyCart = {emptyCart} cartTotal = {cartTotal} /> } />
          <Route exact path="/order" render = {(props) => <Order {... props} shoppingCart = {shoppingCart} addToShoppingCart = {addToShoppingCart} /> } />
          <Route exact path="/orderHistory" render = {(props) => <OrderHistory {... props} shoppingCart = {shoppingCart} addToShoppingCart = {addToShoppingCart} /> } />
          <Route exact path="/profile" render = {(props) => <Profile {... props} shoppingCart = {shoppingCart} /> } />
          <Route exact path="/orderDetail" render = {(props) => <OrderDetail {... props} shoppingCart = {shoppingCart} /> } />
          <Route exact path="/feedback" render = {(props) => <Feedback {... props} shoppingCart = {shoppingCart} /> } />

          {/* Admin Side */}
          <Route exact path="/admin" component={adminLogin} />
          <Route exact path="/admin/login" component={adminLogin} />
          <Route exact path="/admin/home" component={adminHome} /> 
          <Route exact path="/admin/add" component={addAdmin} />
          <Route exact path="/admin/approve" component={approve_orders} />
          <Route exact path="/admin/manage" component={adminManagement} />
          <Route exact path="/admin/feedback" component={adminFeedback} />
          <Route exact path="/admin/invoice" component={invoice} />
          <Route exact path="/admin/orders" component={adminOrders} />
          <Route exact path="/admin/orderView" component={adminOrderView} />
          <Route exact path="/superAdmin" component={superAdminHome} />
          <Route exact path="/admin/products" component={products}/>
          <Route exact path="/admin/editProducts" component={editProducts}/>
          <Route exact path="/admin/addProducts" component={addProducts}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
