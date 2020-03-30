import React from 'react';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Orders extends React.Component{

    componentDidMount(){
        this.props.ON_FETCH_ORDERS(this.props.token, this.props.userId);
    }

    render(){
        const ordersData = this.props.orders;
        const orders = !ordersData ? <Spinner /> : (
            <div>
                {ordersData.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}/>))}
            </div>  );

        return orders;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ON_FETCH_ORDERS : (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect( mapStateToProps , mapDispatchToProps )(withErrorHandler(Orders, axios));