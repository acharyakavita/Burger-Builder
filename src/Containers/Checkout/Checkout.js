import React,{Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        },
        totalPrice:0

    }

    componentWillMount(){
        const query=new URLSearchParams(this.props.location.search);
        const paramIngredients={};
        let price=0;
        for (let param of query.entries()){
            if(param[0]==='price'){
                price=param[1]
            }
            else{
                paramIngredients[param[0]]=+param[1];
            }
            
        }
        this.setState({ingredients:paramIngredients,totalPrice:price})
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
                <Route path={this.props.match.path+'/contact-data'} 
                render={(props)=>{ return <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}{...props}/>}}   />
            </div>
            
        )
    }

}

export default Checkout