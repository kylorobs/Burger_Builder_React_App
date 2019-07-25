import * as actionTypes from '../actions';

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
            let ingredientCount = state.ingredients[action.ingType];
            const updatedCount = ingredientCount + 1;
            const updatedIngredients = {...state.ingredients};
            updatedIngredients[action.ingType] = updatedCount;
            return {ingredients: updatedIngredients};

        case actionTypes.REMOVE_INGREDIENT :
            let ingredientSubCount = state.ingredients[action.ingType];
            const updatedSubCount = ingredientSubCount - 1;
            // if (updatedCount < 0) {
            //     return;
            // }
            const updatedStoreIngredients = {...state.ingredients};
            updatedStoreIngredients[action.ingType] = updatedSubCount;
            return {ingredients: updatedStoreIngredients}
        default: return state;
    }
};

export default ingredientsReducer;