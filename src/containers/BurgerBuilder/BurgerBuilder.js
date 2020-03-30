import React from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/'; // Don't need to add /index.js
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.5,
    cheese: 1,
    meat: 0
}

class BurgerBuilder extends React.Component { 
    
    state = {
        purchasing: false, 
    }

    componentDidMount () {
        this.props.ON_INIT_INGREDIENTS();
    }

    purchaseHandler = () => {
        if(this.props.isAuth) this.setState({purchasing: true})
        else {
            this.props.ON_CHANGE_REDIRECT_PATH('/checkout');
            this.props.history.push({pathname: '/auth'});       
        }
        
    }
 
    updatePurchaseState = () => {
        const sum = Object.keys(this.props.ing)
            .map(igKey => {
                return this.props.ing[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

           return sum > 0
    }

    addIngredientHandler = (type) => {
        this.props.ON_ADD_INGREDIENT(type)
        this.props.ON_ADD_TO_TOTAL(INGREDIENT_PRICES[type])
    }

    removeIngredientHandler = (type) => {
        this.props.ON_REMOVE_INGREDIENT(type);
        this.props.ON_SUBTRACT_FROM_TOTAL(INGREDIENT_PRICES[type])
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false})
    }

    purchaseContinueHandler =() => {
        this.props.ON_RESET_STATUS();
        this.props.history.push({pathname: '/checkout'})
    }

    render(){

        const disabledInfo = {
            ...this.props.ing
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ing){
            orderSummary =  <OrderSummary 
                        ingredients={this.props.ing}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.props.total}/>;
            burger = ( 
                <React.Fragment>
                    <Burger ingredients={this.props.ing}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        isAuth={this.props.isAuth}
                        price={this.props.total}
                        purchaseable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}
                    />
                </React.Fragment>);
        }        
        
        // if (this.state.loading) orderSummary = <Spinner />
        console.log(this.props.ing)
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.ing.ingredients,
        total: state.total.totalPrice,
        error: state.ing.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ON_ADD_INGREDIENT : (type) => dispatch(burgerBuilderActions.addIngredient(type)),
        ON_REMOVE_INGREDIENT: (type) => dispatch(burgerBuilderActions.removeIngredient(type)),
        ON_ADD_TO_TOTAL: (price) => dispatch(burgerBuilderActions.addToTotal(price)),
        ON_SUBTRACT_FROM_TOTAL: (price) => dispatch(burgerBuilderActions.subtractFromTotal(price)),
        ON_INIT_INGREDIENTS: () => dispatch(burgerBuilderActions.initIngredients()),
        ON_RESET_STATUS: () => dispatch(burgerBuilderActions.resetOrderStatus()),
        ON_CHANGE_REDIRECT_PATH: (path) => dispatch(burgerBuilderActions.authChangeRedirectPath(path))
    }   
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));