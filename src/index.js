import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ingredientsReducer from './store/reducers/ingredientsReducer';
import totalPriceReducer from './store/reducers/totalPriceReducer';
import ordersReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    ing: ingredientsReducer,
    total: totalPriceReducer,
    order: ordersReducer,
    auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
