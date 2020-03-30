    import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends React.Component{

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        let checkout = <Redirect to='/' />;
        if ( this.props.ing ) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            checkout =  (
                <React.Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ing}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </React.Fragment>);
        }

        return checkout;
    }
}

const mapStateToProps = (state) => {
    return {
        ing: state.ing.ingredients,
        total: state.total.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);