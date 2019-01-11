import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import Classes from './ContactData.css'

class ContactData extends Component {
    state = {
        name: 'Kavitha',
        address: {
            street: 'Test street1',
            zipCode: 'abcdef'
        },
        email: 'acharyakavita12@gmail.com'
    }
    render() {
        return(
            <div className={Classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type="email" name="email" placeholder="Email Address"/>
                    <input type="text" name="street" placeholder="Street"/>
                    <input type="text" name="postal" placeholder="postal code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;