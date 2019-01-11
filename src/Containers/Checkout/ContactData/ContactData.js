import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: 'Kavitha',
        address: {
            street: 'Test street1',
            zipCode: 'abcdef'
        },
        email: 'acharyakavita12@gmail.com',
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({ loading: false})
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false})
            })
    }
    render() {

        let form=(
            <form>
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type="email" name="email" placeholder="Email Address"/>
                    <input type="text" name="street" placeholder="Street"/>
                    <input type="text" name="postal" placeholder="postal code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if (this.state.loading){
            form=<Spinner/>
        }
        return(
            <div className={Classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;