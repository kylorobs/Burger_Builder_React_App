import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients : null,
    error: false,
    building: false
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingType]: state.ingredients[action.ingType] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    return updateObject(state, {ingredients: updatedIngredients, building: true});    
}

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingType]: state.ingredients[action.ingType] - 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    return updateObject(state, {ingredients: updatedIngredients, building: true});   
}

const setIngredients = (state, action) => {
    return updateObject( state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true} )   
}

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT : return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT : return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS : return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED : return fetchIngredientsFailed(state, action)
        default:
            return state;
    }
};

export default ingredientsReducer;