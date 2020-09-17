import React, { Component } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import classes from "./Checkout.module.css";
import { Route } from "react-router-dom";
import ContactData from "../ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };
  componentWillMount() {
    console.log(this.props);
    let query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //param  ['salad', 1 ]
      console.log(param);
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    console.log("ingredients " + ingredients);
    this.setState({ ingredients: ingredients, price: price });
  }
  CheckoutCancelHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinueHander = () => {
    this.props.history.push({
      pathname: "/checkout/contactdata"
    });
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelHandler={this.CheckoutCancelHandler}
          checkoutContinueHandler={this.CheckoutContinueHander}
        />
        <Route
          path="/checkout/contactdata"
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
