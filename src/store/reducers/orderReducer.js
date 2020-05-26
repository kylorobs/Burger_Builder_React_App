import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    purchased: false,
    orders: [],
    loading: false
}

const orderSubmitted = ( state, action ) => {
    let order = updateObject(action.order, {id: action.id})
    return updateObject(state, {
        orders: state.orders.concat(order),
        purchased: true,
        loading: false
    })   
}

const resetOrderStatus = ( state, action ) => {
    return updateObject(state, {
        loading: false,
        purchased: false                
    })
}

const orderProcessing = ( state, action ) => {
    return updateObject(state, {
        loading: true    
    })
}

const submitOrderFailed = ( state, action ) => {
    return updateObject(state, {
        purchased: false,
        loading: false               
    })    
}

const fetchOrdersStart = ( state, action ) => {
    return updateObject(state, {
        loading: true               
   })   
}

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false               
    })   
}

const fetchOrdersFail = ( state, action ) => {
    return updateObject(state, {
        loading: false               
    })   
}


const ordersReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ORDER_SUBMITTED: return orderSubmitted(state, action)
        case actionTypes.RESET_ORDER_STATUS: return resetOrderStatus(state, action)
        case actionTypes.ORDER_PROCESSING: return orderProcessing(state, action)
        case actionTypes.SUBMIT_ORDER_FAILED: return submitOrderFailed(state, action)
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action)
        default:
            return state
    }
};

export default ordersReducer;