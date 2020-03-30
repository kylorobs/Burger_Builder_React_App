import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    totalPrice: 0
}

const addToTotal = (state, action) => {
    return updateObject(state, {totalPrice: state.totalPrice + action.priceAddition})
}

const subtractFromTotal = (state, action) => {
    return updateObject(state, {totalPrice: state.totalPrice - action.priceSubtraction})
}

const resetTotal = (state, action) => {
    return updateObject(state, {totalPrice: 0})
}

const totalPriceReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_TO_TOTAL : return addToTotal(state, action)
        case actionTypes.SUBTRACT_FROM_TOTAL : return subtractFromTotal(state, action)
        case actionTypes.RESET_TOTAL : return resetTotal(state, action)
        default: return state
    }
}

export default totalPriceReducer;