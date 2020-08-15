import React from 'react'
import classes from './OrderSummary.module.css'
import Button from '../../../ui/Button/Button'

const orderSummary = (props) => {

    const ingredientList = Object.keys(props.ingredients) 
    .map (igKey => {
        return <li> <span ><strong style = {{textTransform: 'capitalize'}}>{igKey}:  </strong></span> {props.ingredients[igKey]}</li>
    })

    
    return (

        <div className = {classes.OrderSummary}> 
        <p>Order Summary</p>
        <p>Your Order with following ingredients: </p>
        <ul>
            {ingredientList}
        </ul>
        <p>Continue to Checkout?</p>
        <Button btnType = 'Danger' clicked = {props.purchaseCancelled}>CANCEL</Button>
        <Button btnType = 'Success' clicked = {props.purchaseContinued}>Continue</Button>

        </div>
    );

}

export default orderSummary;