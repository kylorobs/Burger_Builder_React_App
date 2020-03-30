import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { resetTotal } from './totalPriceActionCreator';

export const addIngredient = (type) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingType: type
    }
}

export const removeIngredient = (type) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingType: type
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}


export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then( res => {
                dispatch(setIngredients(res.data));
                dispatch(resetTotal());
            })
            .catch(er => dispatch(fetchIngredientsFailed()))
    }
}