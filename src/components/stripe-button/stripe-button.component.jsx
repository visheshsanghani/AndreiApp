import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_6C4vD9CkypgF4nA6cOrSL1l400uI94jaeb';


    const onToken = token =>{
        console.log(token);
        alert("Payment Succesfull");
    }

    return(
        <StripeCheckout
        label = 'Pay Now'
        name = 'CRWN Cloathing Ltd'
        billingAddress
        shippingAddress
        image = 'https://sendeyo.com/up/d/f3eb2117da'
        description = {`Your total is ${price}`}
        amount = {priceForStripe}
        panelLabel = 'Pay Now'
        token = {onToken}
        stripeKey = {publishableKey}

        />
    )
}

export default StripeCheckoutButton;