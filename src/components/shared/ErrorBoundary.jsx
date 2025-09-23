import React, { Component } from 'react';
import { Button } from 'antd';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Here you could log the error to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-4">
          <div className="max-w-md text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Oops! Something went wrong
            </h2>

            <p className="mb-6 text-gray-600">
              We're sorry, but something unexpected happened. Please try again
              or contact support if the problem persists.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4 rounded-lg bg-gray-100 p-4 text-left">
                <summary className="mb-2 cursor-pointer font-medium text-red-600">
                  Error Details (Development Only)
                </summary>
                <pre className="overflow-auto text-xs text-gray-800">
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                type="primary"
                className="bg-primary hover:bg-primary/80 border-none"
                onClick={this.handleRetry}
              >
                Try Again
              </Button>

              <Button
                onClick={() => (window.location.href = '/')}
                className="border-gray-300"
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
