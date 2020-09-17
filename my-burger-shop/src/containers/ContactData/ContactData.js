import React, { Component } from "react";
import Spinner from "../../ui/Spinner/Spinner";
import axios from "../../../src/axios_orders";
import Button from "../../ui/Button/Button";
import Input from "../../components/Input/Input";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementConfig: {
          elementType: "input",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        }
      },

      email: {
        elementConfig: {
          elementType: "input",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true
        }
      },

      street: {
        elementConfig: {
          elementType: "input",
          placeholder: "Your street"
        },
        value: "",
        validation: {
          required: true
        }
      },

      zipcode: {
        elementConfig: {
          elementType: "input",
          placeholder: "Zipcode"
        },
        value: "",
        validation: {
          required: true
        }
      },

      deliveryMethod: {
        elementConfig: {
          elementType: "select",
          options: {
            option: {
              value: "fastest",
              displayName: "Fastest"
            },
            option: {
              value: "cheapest",
              displayName: "Cheapest"
            }
          }
        },
        value: "",
        validation: {}
      }
    },
    loading: false
  };

  OrderSubmitHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    let order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "kapil dixit",
        address: {
          street: "123",
          pincode: "201301"
        }
      },
      deliverMethod: "fastest"
    };
    console.log(order);
    axios
      .post("/orders.json", order)
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  onChangeHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
  };
  render() {
    console.log(this.state.orderForm);
    let inputElements = [];
    for (let key in this.state.orderForm) {
      console.log(key + " asdasdas " + this.state.orderForm[key]);
      inputElements.push({
        id: key,
        ...this.state.orderForm[key]
      });
    }
    console.log(inputElements);

    let inputJSXElements = inputElements.map(input => {
      return (
        <Input
          key={input.id}
          elementConfig={input.elementConfig}
          value={input.value}
          changeHandler={event => this.onChangeHandler(event, input.id)}
        />
      );
    });
    let form = <form>{inputJSXElements}</form>;
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div classname={classes.ContactData}>
        {form}
        <Button btnType="Success" clicked={this.OrderSubmitHandler}>
          Order
        </Button>
      </div>
    );
  }
}
export default ContactData;
