import React,{Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

    componentDidMount(){
        const query=new URLSearchParams(this.props.location.search);
        const paramIngredients={};
        for (let param of query.entries()){
            paramIngredients[param[0]]=+param[1];
        }
        this.setState({ingredients:paramIngredients})
    }

    clickCancelHandler=()=>{
        this.props.history.goBack();
    }

    clickContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} 
                clickCancel={this.clickCancelHandler} 
                clickContinue={this.clickContinueHandler}/>
            </div>
            
        )
    }

}

export default Checkout