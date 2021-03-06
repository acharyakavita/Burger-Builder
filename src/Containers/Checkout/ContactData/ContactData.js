import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email-ID'
                },
                value: '',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: 'fastest',
                validation:{
                    required:false,
                },
                valid:true
            },
        },
        loading: false,
        formIsValid:false
    }

    checkValidity(value,rules){
        let isValid=true;
        if(rules.required){
            isValid=value.trim()!=='' && isValid;
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength  && isValid
        }

        if(rules.maxLength){
            isValid=value.length<=rules.maxLength  && isValid
        }
        return isValid;
    }
    inputChangedHandler=(event,inputIdentifier)=>{
        const updatedOrderForm={...this.state.orderForm}
        const updatedFormElement={...updatedOrderForm[inputIdentifier]}
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier]=updatedFormElement

        let formIsValid=true;
        for(let inputID in updatedOrderForm)
        {
            formIsValid=updatedOrderForm[inputID].valid && formIsValid
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formData={}
        for (let elementId in this.state.orderForm){
            formData[elementId]=this.state.orderForm[elementId].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            order:formData
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }
    render() {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(element => {
                    return (<Input elementType={element.config.elementType}
                        key={element.id}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value} 
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,element.id)}/>)
                })}
                <Button disabled={!this.state.formIsValid}btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={Classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )

    }
}
export default ContactData;