import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Aux/Aux";
import Modal from "../../ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../../src/axios_orders";
import Spinner from "../../ui/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Checkout from "../Checkout/Checkout";

const INGREDIENT_PRICE = {
  meat: 0.5,
  cheese: 0.9,
  salad: 1.2,
  bacon: 0.8
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    orderCheckout: false,
    error: null
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/ingredient.json")
      .then(res => {
        console.log(res);
        this.setState({ ingredients: res.data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  }
  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  updatePurchaseableHandler = updatedIngredient => {
    const sumOfIngredients = Object.keys(updatedIngredient)
      .map(igKey => {
        return updatedIngredient[igKey];
      })
      .reduce((sum, el) => {
        return (sum = sum + el);
      }, 0);

    console.log("sumOfIngredients  ", sumOfIngredients);
    this.setState({ purchaseable: sumOfIngredients > 0 });
  };
  addIngrdientHandler = type => {
    const updatedIngredientCount = this.state.ingredients[type] + 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updatedIngredientCount;
    const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

    this.setState({
      totalPrice: updatedTotalPrice,
      ingredients: updatedIngredient
    });
    console.log(this.state.totalPrice);
    this.updatePurchaseableHandler(updatedIngredient);
  };

  removeIngredientHandler = type => {
    const updatedIngredientCount = this.state.ingredients[type] - 1;
    if (updatedIngredientCount >= 0) {
      const updatedIngredient = { ...this.state.ingredients };
      updatedIngredient[type] = updatedIngredientCount;
      const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

      this.setState({
        totalPrice: updatedTotalPrice,
        ingredients: updatedIngredient
      });

      console.log(this.state.totalPrice);
      this.updatePurchaseableHandler(updatedIngredient);
    }
  };
  purchaseCancelHandler = () => {
    console.log("purchaseCancelHandler");
    this.setState({ purchasing: false });
  };

  purchaseContinuedHandler = () => {
    //alert('Purchase Continue!!');

    //this.setState({ orderCheckout: true });
    // let order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "kapil dixit",
    //     address: {
    //       street: "123",
    //       pincode: "201301"
    //     }
    //   },
    //   deliverMethod: "fastest"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(res => {
    //     console.log(res);
    //     this.setState({ orderCheckout: false, purchasing: false });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ orderCheckout: false, purchasing: false });
    //   });

    let queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push(encodeURIComponent("price") + "=" + this.state.totalPrice);
    let searchParams = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + searchParams
    });
  };
  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let igKey in disabledInfo) {
      disabledInfo[igKey] = disabledInfo[igKey] <= 0;
    }
    console.log(disabledInfo);

    let orderSummary = null;

    let burger = null;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}></Burger>

          <BuildControls
            addIngredientHandler={this.addIngrdientHandler}
            removeIngredientHandler={this.removeIngredientHandler}
            totalPrice={this.state.totalPrice}
            disabledInfo={disabledInfo}
            purchaseable={this.state.purchaseable}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      if (this.state.orderCheckout) {
        orderSummary = <Spinner />;
      } else {
        orderSummary = (
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinuedHandler}
          />
        );
      }
    } else {
      burger = !this.state.error ? <Spinner /> : "Ingredients cant be loaded";
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}

        {/* <Checkout /> */}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
