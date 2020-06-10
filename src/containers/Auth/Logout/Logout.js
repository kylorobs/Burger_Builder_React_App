import React, {useEffect} from 'react';
import * as actions from '../../../store/actions/';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



const Logout = props => {

    const { ON_LOGOUT } = props;
    useEffect(() => {

        ON_LOGOUT()
        
    }, [ON_LOGOUT])

    return <Redirect to="/" />
    
}

const mapDispatchToProps = dispatch => {
    return {
        ON_LOGOUT: () => dispatch(actions.logOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout);