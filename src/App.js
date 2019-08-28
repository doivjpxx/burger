import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Order/Order';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';
import * as actions from './store/actions/index';

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
    return (
      <div>
      <Layout>
        {/* {this.state.show ? <BurgerBuilder /> : null} */}
        {/* <BurgerBuilder />
        <Checkout /> */}
        <Switch>
        <Route path="/logout" component={Logout}/>
        <Route path="/auth" component={Auth} />
        <Route path="/checkout" component={Checkout}/>
        <Route path="/orders" component={Orders} />
        <Route path="/" exact  component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
