import React from 'react'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../components/Logo/Logo'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
const toolbar = (props) => {

    return (
        <header className = {classes.Toolbar}>
        <DrawerToggle  clicked = {props.drawerToggleClicked} /> 
        <div className = {classes.Logo}>
            <Logo />
        </div>
        <nav className = {classes.DesktopOnly}>
            <NavigationItems />
        </nav>
        
        </header>
    );
}

export default toolbar;