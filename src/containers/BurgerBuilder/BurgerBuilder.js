import React from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.5,
    cheese: 1,
    meat: 0
}

class BurgerBuilder extends React.Component { 
    
    state = {
        ingredients: null,
        totalPrice: 0, 
        purchaseable: false,
        purchasing: false, 
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('/ingredients.json')
            .then( res => {
                this.setState({ingredients: res.data})
            })
            .catch(er => this.setState({error: true}))
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
 
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({purchaseable : sum > 0})
    }

    addIngredientHandler = (type) => {
        let ingredientCount = this.state.ingredients[type];
        const updatedCount = ingredientCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const updatedTotal = this.state.totalPrice + priceAddition

        this.setState({totalPrice: updatedTotal, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        let ingredientCount = this.state.ingredients[type];
        const updatedCount = ingredientCount - 1;
        if (updatedCount < 0) {
            return;
        }
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceSubtraction = INGREDIENT_PRICES[type];
        const updatedTotal = this.state.totalPrice - priceSubtraction

        this.setState({totalPrice: updatedTotal, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () =>{
        const ingredients = {...this.state.ingredients};
        let query = Object.keys(ingredients)
                        .map(key => key + '=' + ingredients[key])
                        .join('&');
        
        query = query + '&price=' + this.state.totalPrice;

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + query
        })
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.state.ingredients){
            orderSummary =  <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>;
            burger = ( 
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </React.Fragment>);
        }        
        
        if (this.state.loading) orderSummary = <Spinner />

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

export default withErrorHandler(BurgerBuilder, axios);