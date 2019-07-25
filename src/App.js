import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from'./containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter, Route } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';

class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <Layout>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
          {/* <Route path='/checkout/contact-data' component={ContactData} /> */}
        </Layout>
      </BrowserRouter>
    
  );
}
}

export default App;
