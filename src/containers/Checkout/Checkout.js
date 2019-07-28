import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
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
        // let checkout = null;
        // if (this.props.ing){
        //     checkout = ( 
        //         <div>
        //             <CheckoutSummary
        //                 ingredients={this.state.ingredients}
        //                 checkoutCancelled={this.checkoutCancelledHandler}
        //                 checkoutContinued={this.checkoutContinuedHandler}/>
        //         </div>
        //     )
        // }

        return (
            <React.Fragment>
                <CheckoutSummary
                    ingredients={this.props.ing}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ing: state.ing.ingredients,
        total: state.total.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);