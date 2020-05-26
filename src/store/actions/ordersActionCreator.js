import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const orderSubmitted = (id, order) => {
    return {
        type: actionTypes.ORDER_SUBMITTED,
        order: order,
        id
    }
}

export const resetOrderStatus = () => {
    return {
        type: actionTypes.RESET_ORDER_STATUS
    }
}

export const submitOrderFailed = () => {
    return {
        type: actionTypes.SUBMIT_ORDER_FAILED
    }
}

export const orderProcessing = () => {
    return {
        type: actionTypes.ORDER_PROCESSING
    }
}

export const trySubmitOrder = (order, token) => {
    return dispatch => {
        dispatch(orderProcessing());
        axios.post('/orders.json?auth=' + token, order)
        .then(res => dispatch(orderSubmitted(res.data.name, order)))
        .catch(er => dispatch(submitOrderFailed()))
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrderFail = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then( res => {
            const fetchOrders = [];
            for (let key in res.data) {
                fetchOrders.push({...res.data[key], 
                                id: key})
            }
            dispatch(fetchOrderSuccess(fetchOrders))
        })
        .catch(er => {
            dispatch(fetchOrderFail()) 
        })
    }
}

