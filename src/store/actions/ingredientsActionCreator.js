import * as actionTypes from './actionTypes';

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