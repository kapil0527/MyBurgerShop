import React from 'react'
import Logo from '../../components/Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import drawerClasses from './SideDrawer.module.css'
import Backdrop from '../../ui/Backdrop/Backdrop'
import Aux from '../../hoc/Aux/Aux'
const sideDrawer = (props) => {
    //Before returning JSX, let's add css classes for opening and closing the drawer
    let attachedClasses = [drawerClasses.SideDrawer, drawerClasses.Close];
    if(props.open) {
        attachedClasses = [drawerClasses.SideDrawer, drawerClasses.Open];
    }
    
    return (

        <Aux>
        <Backdrop show = {props.open} clicked = {props.closed}/>
        <div className = {attachedClasses.join(' ')}>
            <div className = {drawerClasses.Logo}>
                <Logo />
            </div>
            
            <NavigationItems />
        </div>
        </Aux>
    );
}

export default sideDrawer;