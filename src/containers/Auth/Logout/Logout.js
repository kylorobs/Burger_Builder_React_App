import React from 'react';
import * as actions from '../../../store/actions/';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



class Logout extends React.Component {
    componentDidMount(){
        this.props.ON_LOGOUT()
    }

    render(){
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ON_LOGOUT: () => dispatch(actions.logOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout);