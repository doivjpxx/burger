import React, { Component, lazy } from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Order/Order';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/AsyncComponent/asyncComponent';

const lazyCheckout = lazy(() => import('./containers/Checkout/Checkout'));
const lazyOrders = lazy(() => import('./containers/Order/Order'));
const lazyAuth = lazy(() => import('./containers/Auth/Auth'));

class App extends Component {

  // state = {
  //   show: true
  // };

  // componentDidMount() {
  //   setTimeout(()=>{
  //     this.setState({ show: false });
  //   }, 3000)
  // }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncComponent(lazyAuth)} />
        <Route path="/" exact  component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
        <Route path="/logout" component={Logout}/>
        <Route path="/checkout" component={asyncComponent(lazyCheckout)}/>
        <Route path="/orders" component={asyncComponent(lazyOrders)} />
        <Route path="/auth" component={asyncComponent(lazyAuth)} />
        <Route path="/" exact  component={BurgerBuilder}/>
        <Redirect to="/" />  
      </Switch>
      )
    }

    return (
      <div>
      <Layout>
        {/* {this.state.show ? <BurgerBuilder /> : null} */}
        {/* <BurgerBuilder />
        <Checkout /> */}
        <Switch>
          {routes}
        </Switch>
      </Layout>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
