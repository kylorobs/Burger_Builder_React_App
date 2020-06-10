import React, {useState, useEffect, useCallback } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/'; // Don't need to add /index.js
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.5,
    cheese: 1,
    meat: 0
}

const BurgerBuilder = props => { 
    
    const [purchasing, setPurchasing] = useState(false);

    const ing = useSelector(state => state.ing.ingredients);
    const total = useSelector(state=> state.total.totalPrice);
    const error = useSelector(state=> state.ing.error);
    const isAuth = useSelector(state=> state.auth.token !== null);

    const dispatch = useDispatch();

    const ON_ADD_INGREDIENT = (type) => dispatch(burgerBuilderActions.addIngredient(type));
    const ON_REMOVE_INGREDIENT = (type) => dispatch(burgerBuilderActions.removeIngredient(type));
    const ON_ADD_TO_TOTAL = (price) => dispatch(burgerBuilderActions.addToTotal(price));
    const ON_SUBTRACT_FROM_TOTAL = (price) => dispatch(burgerBuilderActions.subtractFromTotal(price));
    const ON_INIT_INGREDIENTS = useCallback(() => dispatch(burgerBuilderActions.initIngredients()), []);
    const ON_RESET_STATUS = () => dispatch(burgerBuilderActions.resetOrderStatus());
    const ON_CHANGE_REDIRECT_PATH = (path) => dispatch(burgerBuilderActions.authChangeRedirectPath(path));


    useEffect(() => {
        ON_INIT_INGREDIENTS();
    }, [ON_INIT_INGREDIENTS]);


    const purchaseHandler = () => {
        if (isAuth) setPurchasing(true)
        else {
            ON_CHANGE_REDIRECT_PATH('/checkout');
            props.history.push({pathname: '/auth'});       
        }
        
    }
 
    const updatePurchaseState = () => {
        const sum = Object.keys(ing)
            .map(igKey => {
                return ing[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

           return sum > 0
    }

    const addIngredientHandler = (type) => {
        ON_ADD_INGREDIENT(type)
        ON_ADD_TO_TOTAL(INGREDIENT_PRICES[type])
    }

    const removeIngredientHandler = (type) => {
        ON_REMOVE_INGREDIENT(type);
        ON_SUBTRACT_FROM_TOTAL(INGREDIENT_PRICES[type])
    }

    const purchaseCancelHandler = () =>{
        setPurchasing(false)
    }

    const purchaseContinueHandler =() => {
        ON_RESET_STATUS();
        props.history.push({pathname: '/checkout'})
    }


        const disabledInfo = {
            ...ing
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (ing){
            orderSummary =  <OrderSummary 
                        ingredients={ing}
                        purchaseCancelled={purchaseCancelHandler}
                        purchaseContinued={purchaseContinueHandler}
                        price={total}/>;
            burger = ( 
                <React.Fragment>
                    <Burger ingredients={ing}/>
                    <BuildControls 
                        ingredientAdded={addIngredientHandler}
                        ingredientRemoved={removeIngredientHandler} 
                        disabled={disabledInfo}
                        isAuth={isAuth}
                        price={total}
                        purchaseable={updatePurchaseState()}
                        ordered={purchaseHandler}
                    />
                </React.Fragment>);
        }        
        
        return (
            <React.Fragment>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }


// const mapStateToProps = state => {
//     return {
//         ing: state.ing.ingredients,
//         total: state.total.totalPrice,
//         error: state.ing.error,
//         isAuth: state.auth.token !== null
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         ON_ADD_INGREDIENT : (type) => dispatch(burgerBuilderActions.addIngredient(type)),
//         ON_REMOVE_INGREDIENT: (type) => dispatch(burgerBuilderActions.removeIngredient(type)),
//         ON_ADD_TO_TOTAL: (price) => dispatch(burgerBuilderActions.addToTotal(price)),
//         ON_SUBTRACT_FROM_TOTAL: (price) => dispatch(burgerBuilderActions.subtractFromTotal(price)),
//         ON_INIT_INGREDIENTS: () => dispatch(burgerBuilderActions.initIngredients()),
//         ON_RESET_STATUS: () => dispatch(burgerBuilderActions.resetOrderStatus()),
//         ON_CHANGE_REDIRECT_PATH: (path) => dispatch(burgerBuilderActions.authChangeRedirectPath(path))
//     }   
// }


// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

export default withErrorHandler(BurgerBuilder, axios);