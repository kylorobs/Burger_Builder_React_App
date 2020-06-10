import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from'./containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';

const Auth = React.lazy(() => {
  return import ('./containers/Auth/Auth')
})

const Checkout = React.lazy(() => {
  return import ('./containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import ('./containers/Checkout/Orders/Orders')
})


const App = (props)=> {
  
  const { ON_TRY_AUTO_LOGIN } = props;
  useEffect(() => {

    ON_TRY_AUTO_LOGIN(); 

  }, [ON_TRY_AUTO_LOGIN]); 

  let routes = (
    <Switch>
        <Route path='/auth' render={(props) => <Auth {...props} />} />
        <Route path='/' exact component={BurgerBuilder} /> 
        <Redirect to='/' />    
    </Switch>
  );

  if (props.isAuth){
    routes = (
      <Switch>
          <Route path='/checkout' render={(props) => <Checkout {...props} />} />
          <Route path='/orders'render={(props) => <Orders {...props} />} />
          <Route path='/auth' render={(props) => <Auth {...props} />} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />         
      </Switch>
    );
  }
    return (
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
      </BrowserRouter>
    
  );
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
