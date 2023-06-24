import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: "",
    errorInfo: "",
  };
  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }
  render() {
    const { hasError } = this.state;
    const { error } = this.props;
    console.log("hasError#", hasError, error);
    if (hasError) {
      return (
        <div>
          <p>{error && error.toString()}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
