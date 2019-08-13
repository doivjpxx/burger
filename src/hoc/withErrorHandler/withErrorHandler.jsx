import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      err: null
    };

    componentWillMount() {
      axios.interceptors.request.use(req => {
        this.setState({ err: null });
        return req;
      });
      axios.interceptors.response.use(res => res, err => {
        this.setState({ err: err });
      });
    }

    errorConfirmedHandler = () => {
      this.setState({ err: null });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.err} modalClosed={this.errorConfirmedHandler}>
            {this.state.err ? this.state.err.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
