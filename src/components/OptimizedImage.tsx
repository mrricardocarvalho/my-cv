import { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
}

function OptimizedImage({ src, alt, className, fallback, ...props }: OptimizedImageProps) {
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;

    const handleError = () => {
        if (retryCount < maxRetries) {
            // Retry loading with exponential backoff
            setTimeout(() => {
                setRetryCount(prev => prev + 1);
                setError(null);
            }, Math.pow(2, retryCount) * 1000);
            setError('RETRYING');
        } else {
            setError('FAILED');
        }
    };

    const handleRetry = () => {
        setRetryCount(0);
        setError(null);
    };

    if (error === 'FAILED' && fallback) {
        return (
            <div className={`bg-gray-200 flex flex-col items-center justify-center ${className}`}>
                <span className="text-gray-500 mb-2">{fallback}</span>
                <button 
                    onClick={handleRetry}
                    className="text-xs text-blue-600 hover:text-blue-800"
                >
                    <i className="fas fa-redo mr-1"></i>
                    Retry
                </button>
            </div>
        );
    }

    if (error === 'RETRYING') {
        return (
            <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading="lazy"
            onError={handleError}
            {...props}
        />
    );
}

export default OptimizedImage;
