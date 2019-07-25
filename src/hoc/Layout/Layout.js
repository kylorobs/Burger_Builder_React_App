import React from 'react';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

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
                <Toolbar  openMenu={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSlideDrawer} closed={this.sideDrawerToggleHandler}/>
                <main className='Content'>
                    {this.props.children}
                </main>
            </React.Fragment>
    );

    }
}
    
export default layout;