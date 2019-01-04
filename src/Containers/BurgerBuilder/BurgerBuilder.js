import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 1,
    bacon: 0.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false

    };

    purchaseHandler=()=>{
        this.setState({ purchasing: true })
    }

    /*Order now button will be enabled only if ingredients are selected*/
    updatePurchaseState(updatedIngredients) {

        const sum = Object.values(updatedIngredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        this.setState({ purchaseable: sum > 0 })
    }

    /*To handle addition of ingredient and its corresponding price*/
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount;

        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    /*To handle substraction of ingredient and its corresponding price*/
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = { ...this.state.ingredients }
            updatedIngredients[type] = updatedCount;

            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            })
            this.updatePurchaseState(updatedIngredients);
        }
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        /*disabledinfo will have true /false as value*/
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    click={this.purchaseHandler} />
            </Aux>
        )
    }
};

export default BurgerBuilder;