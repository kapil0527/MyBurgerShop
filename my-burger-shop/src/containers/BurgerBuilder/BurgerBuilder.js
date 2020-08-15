import React, {Component} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Aux/Aux'
import Modal from '../../ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICE = {
    meat: 0.5,
    cheese: 0.9,
    salad: 1.2,
    bacon: 0.8
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false

    }
    purchasingHandler = () => {

        this.setState({purchasing: true});
    }

    updatePurchaseableHandler = (updatedIngredient) => {

        const sumOfIngredients = Object.keys(updatedIngredient)
    .map(igKey => {
        return updatedIngredient[igKey]
       
    })
    .reduce( (sum, el) => {
        return sum  = sum + el
    }, 0);

    console.log('sumOfIngredients  ', sumOfIngredients);
    this.setState({purchaseable: sumOfIngredients > 0});
    }
    addIngrdientHandler = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = updatedIngredientCount;
        const updatedTotalPrice = this.state.totalPrice  + INGREDIENT_PRICE[type];
        
        this.setState({totalPrice: updatedTotalPrice, ingredients: updatedIngredient})
        console.log(this.state.totalPrice)
        this.updatePurchaseableHandler(updatedIngredient);

    }


    removeIngredientHandler = (type)  => {
        const updatedIngredientCount = this.state.ingredients[type] - 1;
        if(updatedIngredientCount >= 0) {
            const updatedIngredient = {...this.state.ingredients};
            updatedIngredient[type] = updatedIngredientCount;
            const updatedTotalPrice = this.state.totalPrice  - INGREDIENT_PRICE[type];
            
            this.setState({totalPrice: updatedTotalPrice.toFixed(2), ingredients: updatedIngredient})

            console.log(this.state.totalPrice)
            this.updatePurchaseableHandler(updatedIngredient);
        }
    }
    purchaseCancelHandler = () => {
        console.log('purchaseCancelHandler');
        this.setState({purchasing: false});
    }

    purchaseContinuedHandler = () => {

        alert('Purchase Continue!!');
    }
    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let igKey in disabledInfo) {
            disabledInfo[igKey] = disabledInfo[igKey] <=0
        }
        console.log(disabledInfo);
       return (
        <Aux>
            <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                <OrderSummary 
                ingredients = {this.state.ingredients}
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinuedHandler}
                />
            </Modal>
            
            <Burger ingredients  = {this.state.ingredients}></Burger>
            
            <BuildControls
            addIngredientHandler = {this.addIngrdientHandler}
            removeIngredientHandler = {this.removeIngredientHandler}
            totalPrice = {this.state.totalPrice}
            disabledInfo = {disabledInfo}
            purchaseable = {this.state.purchaseable}
            ordered = {this.purchasingHandler}
            />
       </Aux>
       );
    }

}

export default BurgerBuilder;
