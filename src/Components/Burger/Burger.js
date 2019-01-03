import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    /*The below code gets an object as input from the props having ingredients name and quantity.
    We use Object.keys to convert the recieved object into an array of elements with the repeatition of ingredients as per the quantity*/
    const arrayOfIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) =>
                <BurgerIngredients key={igKey + i} type={igKey} />
            )
        })

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {arrayOfIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
};

export default burger;