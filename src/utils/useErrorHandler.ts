import { useState, useCallback } from 'react';
import { AppError, handleHttpError, withRetry } from './errorHandlers';
import { ErrorReporter } from './errorReporting';

interface UseErrorHandlerOptions {
    onError?: (error: AppError) => void;
    retryAttempts?: number;
    componentName?: string;
    context?: Record<string, unknown>;
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
    const [error, setError] = useState<AppError | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleError = useCallback((err: unknown) => {
        const appError = handleHttpError(err);
        setError(appError);
        
        // Report error with component context
        const errorReporter = ErrorReporter.getInstance();
        errorReporter.reportError(appError, {
            componentName: options.componentName,
            additionalInfo: options.context
        });
        
        options.onError?.(appError);
        return appError;
    }, [options.onError, options.componentName, options.context]);

    const executeWithErrorHandling = useCallback(async <T,>(
        operation: () => Promise<T>,
        shouldRetry = true
    ): Promise<T | null> => {
        setError(null);
        setIsLoading(true);

        try {
            if (shouldRetry) {
                return await withRetry(operation, {
                    maxAttempts: options.retryAttempts || 3
                });
            }
            return await operation();
        } catch (err) {
            handleError(err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [handleError, options.retryAttempts]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        error,
        isLoading,
        handleError,
        executeWithErrorHandling,
        clearError
    };
}
