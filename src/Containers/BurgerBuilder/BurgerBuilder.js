import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 1,
    bacon: 0.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false

    };

    componentDidMount() {
        axios.get('https://react-burger-builder-bdac0.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error=>{
                this.setState({error:true})
            })
    }

    /*opens the modal*/
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    /*closes the modal*/
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    /*success button on order summary modal*/
    purchaseContinueHandler = () => {
        /*this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kavitha',
                address: {
                    street: 'Test street1',
                    city: 'Toronto',
                    country: 'Canada',
                    zipCode: 'abcdef'
                },
                email: 'acharyakavita12@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false })
            })*/
            const queryParams=[];
            for (let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
            }
            const queryString= queryParams.join('&')
            this.props.history.push(
                {pathname:'/checkout',
                search:'?'+ queryString})
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
        /*disabledinfo will have true /false as value*/
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        

        let burger = this.state.error?<p>Ingredients cannot be loaded</p>:<Spinner/> 
        let orderSummary=null;
        if(this.state.ingredients){
            burger=(<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    click={this.purchaseHandler} />
            </Aux>)
            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            continue={this.purchaseContinueHandler}
            cancel={this.purchaseCancelHandler}
            price={this.state.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
};

export default WithErrorHandler(BurgerBuilder, axios);