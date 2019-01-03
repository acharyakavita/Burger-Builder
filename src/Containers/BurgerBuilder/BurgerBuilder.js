import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:1,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {
    state={
        ingredients:{
            salad:1,
            bacon:1,
            cheese:1,
            meat:1,
        },
        totalPrice:4
    };

    /*To handle addition of ingredient and its corresponding price*/
    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount= oldCount+1;
        const updatedIngredients={...this.state.ingredients}
        updatedIngredients[type]=updatedCount;

        const newPrice=INGREDIENT_PRICES[type]+this.state.totalPrice;
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:newPrice
        })
        
    }

    /*To handle substraction of ingredient and its corresponding price*/
    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0){
            const updatedCount= oldCount-1;
            const updatedIngredients={...this.state.ingredients}
            updatedIngredients[type]=updatedCount;

            const newPrice=INGREDIENT_PRICES[type] - this.state.totalPrice;
            this.setState({
                ingredients:updatedIngredients,
                totalPrice:newPrice
            })
        }
        
    }
    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for  (let key in disabledInfo)
        {
            disabledInfo[key]=disabledInfo[key]<=0
        }
        /*disabledinfo will have true /false as value*/
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}/>
            </Aux>
        )
    }
};

export default BurgerBuilder;