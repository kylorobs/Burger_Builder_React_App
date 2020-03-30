import * as actionTypes from './actionTypes';

export const addToTotal = (price) => {
    return {
        type: actionTypes.ADD_TO_TOTAL, 
        priceAddition : price
    }
}

export const subtractFromTotal = (price) => {
    return {
        type: actionTypes.SUBTRACT_FROM_TOTAL, 
        priceSubtraction : price
    }
}

export const resetTotal = () => {
    return {
        type: actionTypes.RESET_TOTAL
    }
}