import { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: React.ReactNode;
    onLoadError?: (error: string) => void;
    // Optionally allow explicit webpSrc override
    webpSrc?: string;
}

function getWebpSrc(src?: string) {
    if (!src) return undefined;
    // Only replace .png/.jpg/.jpeg at the end
    return src.replace(/\.(png|jpe?g)$/i, '.webp');
}

function OptimizedImage({ src, alt, className, fallback, onLoadError, webpSrc, ...props }: OptimizedImageProps) {
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;

    const handleError = () => {
        if (retryCount < maxRetries) {
            setTimeout(() => {
                setRetryCount(prev => prev + 1);
                setError(null);
            }, Math.pow(2, retryCount) * 1000);
            setError('RETRYING');
        } else {
            setError('FAILED');
            onLoadError?.('FAILED');
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
                    className="text-xs text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1"
                    aria-label="Retry loading image"
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

    // Use provided webpSrc or auto-generate from src
    const webp = webpSrc || getWebpSrc(src);

    return (
        <picture>
            {webp && (
                <source srcSet={webp} type="image/webp" />
            )}
            <img
                src={src}
                alt={alt}
                className={className}
                loading="lazy"
                onError={handleError}
                {...props}
            />
        </picture>
    );
}

export default OptimizedImage;
