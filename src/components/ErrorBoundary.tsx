import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AppError } from '../utils/errorHandlers';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | AppError | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReset = async () => {
        // Check internet connection first
        if (!navigator.onLine) {
            alert('Please check your internet connection and try again.');
            return;
        }

        // Clear the error state
        this.setState({
            hasError: false,
            error: null
        });

        // If we're handling a network error, wait a moment before retrying
        if (this.state.error instanceof AppError && this.state.error.isNetworkError()) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    };

    private getErrorIcon = () => {
        if (!this.state.error) return <i className="fas fa-exclamation-circle"></i>;
        
        if (this.state.error instanceof AppError) {
            switch (this.state.error.type) {
                case 'NETWORK_ERROR':
                    return <i className="fas fa-wifi-slash"></i>;
                case 'NOT_FOUND':
                    return <i className="fas fa-search"></i>;
                case 'TIMEOUT':
                    return <i className="fas fa-clock"></i>;
                case 'SERVER_ERROR':
                    return <i className="fas fa-server"></i>;
                default:
                    return <i className="fas fa-exclamation-circle"></i>;
            }
        }
        
        return <i className="fas fa-exclamation-circle"></i>;
    };

    private getErrorTitle = () => {
        if (!this.state.error) return 'Something went wrong';
        
        if (this.state.error instanceof AppError) {
            switch (this.state.error.type) {
                case 'NETWORK_ERROR':
                    return 'Connection Error';
                case 'NOT_FOUND':
                    return 'Not Found';
                case 'TIMEOUT':
                    return 'Request Timeout';
                case 'SERVER_ERROR':
                    return 'Server Error';
                default:
                    return 'Something went wrong';
            }
        }
        
        return 'Something went wrong';
    };

    private getErrorMessage = () => {
        if (!this.state.error) return 'An unexpected error occurred';
        return this.state.error.message || 'An unexpected error occurred';
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8 text-center">
                        <div className="text-red-500 text-6xl mb-4">
                            {this.getErrorIcon()}
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            {this.getErrorTitle()}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {this.getErrorMessage()}
                        </p>
                        <div className="mt-5 space-x-4">
                            <button
                                onClick={this.handleReset}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Try Again
                            </button>
                            <Link
                                to="/"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <i className="fas fa-home mr-2"></i>
                                Return Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
