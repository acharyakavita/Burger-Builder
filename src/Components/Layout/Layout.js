import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Classes from '../Layout/Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state={
        showSideDrawer: true
    }

    sideDrawerClosedHandler=()=> {
        this.setState({showSideDrawer: false})
    };

    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer open={this.state.showSideDrawer} click={this.sideDrawerClosedHandler} />
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )

    }
}


export default Layout;