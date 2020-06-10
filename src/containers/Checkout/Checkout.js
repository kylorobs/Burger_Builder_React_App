import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


const Checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let checkout = <Redirect to='/' />;
    if ( props.ing ) {
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
        checkout =  (
            <React.Fragment>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ing}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}/>
                <Route path={props.match.path + '/contact-data'} component={ContactData} />
            </React.Fragment>);
    }

        return checkout;
}

const mapStateToProps = (state) => {
    return {
        ing: state.ing.ingredients,
        total: state.total.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);