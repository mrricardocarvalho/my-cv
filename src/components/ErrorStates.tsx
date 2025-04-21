import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppError } from '../utils/errorHandlers';

interface ErrorStateProps {
    error: AppError;
    onRetry?: () => void;
}

export const GenericErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
    <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">
            <i className="fas fa-exclamation-circle"></i>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Something went wrong
        </h2>
        <p className="mt-2 text-sm text-gray-600">
            {error.message}
        </p>
        {onRetry && (
            <button
                onClick={onRetry}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
                <i className="fas fa-redo mr-2"></i>
                Try Again
            </button>
        )}
    </div>
);

export const NotFoundErrorState: React.FC = () => (
    <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">
            <i className="fas fa-search"></i>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Content Not Found
        </h2>
        <p className="mt-2 text-sm text-gray-600">
            The content you're looking for doesn't exist or has been moved.
        </p>
        <Link
            to="/"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
        >
            <i className="fas fa-home mr-2"></i>
            Return Home
        </Link>
    </div>
);

export const NetworkErrorState: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => {
    const [isCheckingConnection, setIsCheckingConnection] = useState(false);

    const handleRetry = async () => {
        setIsCheckingConnection(true);
        try {
            if (!navigator.onLine) {
                throw new Error('No internet connection');
            }
            await fetch('/vite.svg');
            onRetry?.();
        } catch (error) {
            alert('Please check your internet connection and try again.');
        } finally {
            setIsCheckingConnection(false);
        }
    };

    return (
        <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">
                <i className="fas fa-wifi-slash"></i>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Connection Error
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                Unable to load content. Please check your internet connection.
            </p>
            <div className="mt-4 space-x-4">
                <button 
                    onClick={handleRetry}
                    disabled={isCheckingConnection}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <i className={`fas fa-${isCheckingConnection ? 'circle-notch fa-spin' : 'redo'} mr-2`}></i>
                    {isCheckingConnection ? 'Checking Connection...' : 'Retry'}
                </button>
                <Link 
                    to="/"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    <i className="fas fa-home mr-2"></i>
                    Return Home
                </Link>
            </div>
        </div>
    );
};
