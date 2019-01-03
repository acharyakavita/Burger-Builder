import 'React' from React;
import classes from '../BurgerIngredients/BurgerIngredients.css';

const burgerIngredients = (props) => {
    let ingredients = null;
    switch (props.type) {
        case 'bread-bottom':
            ingredients = <div className={classes.BreadBottom}></div>;
            break;
        case 'bread-top':
            ingredients = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            )
            break;
        case 'meat':
            ingredients = <div className={classes.Meat}></div>;
            break;
        case 'salad':
            ingredients = <div className={classes.Salad}></div>;
            break;
        case 'cheese':
            ingredients = <div className={classes.Cheese}></div>;
            break;
        case 'bacon':
            ingredients = <div className={classes.Bacon}></div>;
            break;
        default:
            ingredients= null;

    }
    return ingredients;
}

export default burgerIngredients;