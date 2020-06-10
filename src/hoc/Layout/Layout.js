import React, { useState } from 'react';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {

    const [showSlideDrawer, toggleSlideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        toggleSlideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        toggleSlideDrawer(prevState => !showSlideDrawer)
    }


    return (
        <React.Fragment>
            <Toolbar  openMenu={sideDrawerToggleHandler} isAuth={props.isAuthenticated} />
            <SideDrawer open={showSlideDrawer} closed={sideDrawerClosedHandler} isAuth={props.isAuthenticated}/>
            <main className='Content'>
                {props.children}
            </main>
        </React.Fragment>
);

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null   
    }
}
    
export default connect(mapStateToProps, null)(Layout);