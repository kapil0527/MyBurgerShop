import React, {Component} from 'react'
import classes from './Layout.module.css'
import Aux from '../../hoc/Aux/Aux'
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder'
import Toolbar from '../../Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state  = {
        sideDrawerOpen: true
    }

    sideDrawerClosedHandler  = () => {

        this.setState({sideDrawerOpen: false});
    }

    sideDrawerToggleHandler = () => {

        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        })
    }

    render () {

       return( <Aux>
            <SideDrawer open = {this.state.sideDrawerOpen} closed = {this.sideDrawerClosedHandler}/>
            <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>

            <main className = {classes.Content}> 

                <BurgerBuilder/>
            </main>
    </Aux>
       );
    }
}

export default Layout