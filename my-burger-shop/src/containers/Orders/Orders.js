import React, { Component } from "react";
import classes from "./Orders.module.css";
import Order from "../../components/Order/Order";
import axios from "../../../src/axios_orders";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../ui/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],

    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("orders.json")
      .then(res => {
        let orders = [];
        console.log(res.data);
        for (let key in res.data) {
          orders.push({
            id: key,
            ...res.data[key]
          });
        }
        console.log(orders);
        this.setState({ orders: orders, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }
  render() {
    let orders = this.state.orders.map(order => {
      console.log(order);
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });

    if (this.state.loading) {
      orders = <Spinner />;
    }

    return (
      <div className={classes.Orders}>
        <h4>My Orders</h4>
        {orders}
      </div>
    );
  }
}

export default WithErrorHandler(Orders, axios);
