import React from 'react'
import classes from './NavigationItem.module.css'

const navigationItems = (props) => {

return (
        
           <li className = {classes.NavigationItem}>
                <a href = "/" className = {props.active ? classes.active:null}>{props.children}</a>
           </li> 
       
);

}

export default navigationItems;