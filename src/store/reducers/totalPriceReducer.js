import * as actionTypes from '../actions';

const initialState = {
    totalPrice: 0
}

const totalPriceReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_TO_TOTAL :
            return {
                ...state,
                totalPrice: state.totalPrice + action.priceAddition
            }
        case actionTypes.SUBTRACT_FROM_TOTAL :
            return {
                ...state,
                totalPrice: state.totalPrice - action.priceSubtraction
            }
        default: return state
    }
}

export default totalPriceReducer;