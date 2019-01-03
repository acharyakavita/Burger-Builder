import React from 'react';
import Aux from '../../hoc/Auxilary';
import Classes from '../Layout/Layout.css'
const layout = (props) => (
    <Aux>
        <div>Toolbar,Sidebar,Backdrop</div>
        <main className={Classes.Content}>
            {props.children}
        </main>
    </Aux>

);

export default layout;