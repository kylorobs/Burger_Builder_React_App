import * as actionTypes from '../actions';

const initialState = {
    totalPrice: 0
}

const totalPriceReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_TO_TOTAL :
            let updatedTotal = state.totalPrice + action.priceAddition
            return {...state, totalPrice: updatedTotal};
        case actionTypes.SUBTRACT_FROM_TOTAL :
            let updatedSubTotal = state.totalPrice - action.priceSubtraction
            return {...state, totalPrice: updatedSubTotal}
        default: return state
    }
}

export default totalPriceReducer;