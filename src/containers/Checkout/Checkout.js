import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends React.Component{

    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    // componentDidMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     let ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()){
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         }
    //         else {
    //             ingredients[param[0]] = Number(param[1]);
    //         }
    //     }
    //     console.log(ingredients)
    //     this.setState({ingredients, totalPrice: price})
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        console.log(this.state.ingredients)
        let checkout = null;
        if (this.state.ingredients){
            checkout = ( 
                <div>
                    <CheckoutSummary
                        ingredients={this.state.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                </div>
            )
        }

        return (
            <React.Fragment>
                {checkout}
                <Route path={this.props.match.path + '/contact-data'} render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props}/>)} />
            </React.Fragment>
        )
    }
}

export default Checkout;