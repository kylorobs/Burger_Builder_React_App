import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients : {
        bacon: 0,
        meat: 0,
        cheese: 0,
        salad: 0
    }
}

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT :
            return {
                ...state, 
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] + 1
                }
            }

        case actionTypes.REMOVE_INGREDIENT :
            return {
                ...state, 
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] - 1
                    }
                }
    }
    return state;
};

export default ingredientsReducer;