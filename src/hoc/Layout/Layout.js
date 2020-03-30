import React from 'react';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class layout extends React.Component{

    state = {
        showSlideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSlideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState )  => {
            return { showSlideDrawer: !prevState.showSlideDrawer};
        } );
    }


    render(){
        return (
            <React.Fragment>
                <Toolbar  openMenu={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated} />
                <SideDrawer open={this.state.showSlideDrawer} closed={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated}/>
                <main className='Content'>
                    {this.props.children}
                </main>
            </React.Fragment>
    );

    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null   
    }
}
    
export default connect(mapStateToProps, null)(layout);