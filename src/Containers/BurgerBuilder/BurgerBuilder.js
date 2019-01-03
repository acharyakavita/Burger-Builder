import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
class BurgerBuilder extends Component {
    state={
        ingredients:{
            salad:1,
            bacon:1,
            cheese:3,
            meat:1,
        }
    }
    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls/>
            </Aux>
        )
    }
}

export default BurgerBuilder;