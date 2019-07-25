import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { strictEqual } from 'assert';


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
                <Route path={this.props.match.path + '/contact-data'} render={() => (<ContactData ingredients={this.props.ing} price={this.props.total} {...this.props}/>)} />
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