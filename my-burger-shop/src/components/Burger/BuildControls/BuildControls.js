import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
const buildControls = (props) => {

    const controls = [   
        {label: 'Meat', type: 'meat'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Salad', type: 'salad'},
        {label: 'Bacon', type: 'bacon'}
        
    ]
    return (
        <div className = {classes.BuildControls}>
         <p>Current Price: {props.totalPrice}</p>
        {controls.map(ctrl => <BuildControl 
        key = {ctrl.label} 
        Label = {ctrl.label}
        added = {() => props.addIngredientHandler(ctrl.type)}
        removed = {() => props.removeIngredientHandler(ctrl.type)}
        disabled = {props.disabledInfo[ctrl.type]}
        />)}
        <button className = {classes.OrderButton} disabled = {!props.purchaseable} onClick = {props.ordered}>ORDER NOW</button>

        </div>
    );
}

export default buildControls;