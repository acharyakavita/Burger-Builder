import React from 'react';
import classes from './DrawerToggle.css';


const drawerToggle = (props) => {
    return (
        <div onClick={props.clicked}>Menu</div>
    )
}
export default drawerToggle;