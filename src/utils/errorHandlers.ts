// Types of errors we want to handle specifically
export type ErrorType = 
    | 'NETWORK_ERROR' 
    | 'NOT_FOUND' 
    | 'TIMEOUT' 
    | 'SERVER_ERROR' 
    | 'VALIDATION_ERROR'
    | 'AUTH_ERROR'
    | 'UNKNOWN';

export interface ErrorDetails {
    code?: string;
    context?: Record<string, unknown>;
}

export class AppError extends Error {
    constructor(
        public type: ErrorType,
        message: string,
        public details?: ErrorDetails,
        public readonly originalError?: Error
    ) {
        super(message);
        this.name = 'AppError';
    }

    public isNetworkError(): boolean {
        return this.type === 'NETWORK_ERROR';
    }

    public isNotFound(): boolean {
        return this.type === 'NOT_FOUND';
    }

    public isServerError(): boolean {
        return this.type === 'SERVER_ERROR';
    }
}

export function handleHttpError(error: any): AppError {
    if (!navigator.onLine) {
        return new AppError(
            'NETWORK_ERROR',
            'No internet connection',
            { code: 'OFFLINE' }
        );
    }

    if (error instanceof AppError) {
        return error;
    }

    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        return new AppError(
            'NETWORK_ERROR',
            'Network request failed',
            { code: 'FETCH_FAILED' }
        );
    }

    if (error.status === 404 || error.response?.status === 404) {
        return new AppError(
            'NOT_FOUND',
            'Resource not found',
            { code: 'RESOURCE_NOT_FOUND' }
        );
    }

    if (error.status >= 500 || error.response?.status >= 500) {
        return new AppError(
            'SERVER_ERROR',
            'Server error occurred',
            { code: 'SERVER_ERROR' }
        );
    }

    if (error.message === 'TIMEOUT') {
        return new AppError(
            'TIMEOUT',
            'Request timed out',
            { code: 'REQUEST_TIMEOUT' }
        );
    }

    if (error instanceof Error) {
        return new AppError(
            'UNKNOWN',
            error.message,
            { code: 'UNKNOWN_ERROR' },
            error
        );
    }

    return new AppError(
        'UNKNOWN',
        'An unexpected error occurred',
        { code: 'UNKNOWN_ERROR' }
    );
}

interface RetryOptions {
    maxAttempts?: number;
    delayMs?: number;
    backoffFactor?: number;
    shouldRetry?: (error: Error) => boolean;
}

const defaultRetryOptions: Required<RetryOptions> = {
    maxAttempts: 3,
    delayMs: 1000,
    backoffFactor: 2,
    shouldRetry: (error) => {
        if (error instanceof AppError) {
            // Don't retry not found or validation errors
            return !['NOT_FOUND', 'VALIDATION_ERROR', 'AUTH_ERROR'].includes(error.type);
        }
        return true;
    }
};

export async function withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const opts = { ...defaultRetryOptions, ...options };
    let lastError: Error | undefined;
    let currentDelay = opts.delayMs;

    for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error: any) {
            lastError = error;
            
            if (attempt === opts.maxAttempts || !opts.shouldRetry(error)) {
                break;
            }

            await new Promise(resolve => setTimeout(resolve, currentDelay));
            currentDelay *= opts.backoffFactor;
        }
    }

    throw lastError || new Error('Operation failed after retries');
}
