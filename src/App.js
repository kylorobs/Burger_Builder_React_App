import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from'./containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';

class App extends React.Component{

  componentDidMount(){
    this.props.ON_TRY_AUTO_LOGIN(); 
  }

  render(){

    let routes = (
      <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/' exact component={BurgerBuilder} />   
      </Switch>
    );
    if (this.props.isAuth){
      routes = (
        <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />         
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    
  );
}
}

const mapDispatchToProps = dispatch => {
  return {
    ON_TRY_AUTO_LOGIN: () => dispatch(actions.authCheckState())
  }
}

const mapStateToProps =  state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
