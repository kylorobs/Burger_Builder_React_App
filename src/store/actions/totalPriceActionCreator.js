import * as actionTypes from './actionTypes';

export addToTotal = (price) => {
    return {
        type: actionTypes.ADD_TO_TOTAL, 
        priceAddition : price
    }
}

export subtractFromTotal = (price) => {
    return {
        type: actionTypes.SUBTRACT_FROM_TOTAL, 
        priceSubtraction : price
    }
}