import React from 'react';
import Aux from '../../hoc/Auxilary';
import Classes from '../Layout/Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
const layout = (props) => (
    <Aux>
        <Toolbar/>
        <main className={Classes.Content}>
            {props.children}
        </main>
    </Aux>

);

export default layout;