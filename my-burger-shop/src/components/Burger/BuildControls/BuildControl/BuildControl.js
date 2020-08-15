import React from 'react'
import calsses from './BuildControl.module.css'
const buildControl = (props) => {

    return (
        <div className = {calsses.BuildControl}>
            <p className = {calsses.Label}>{props.Label}</p>
            <button className = {calsses.Less} onClick = {props.removed} disabled = {props.disabled}>Less</button>
            <button className = {calsses.More} onClick = {props.added}>More</button>
        </div>
    );
}

export default buildControl;