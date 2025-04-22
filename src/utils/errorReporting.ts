import { AppError } from './errorHandlers';

interface ErrorContext {
    componentName?: string;
    route?: string;
    timestamp: number;
    additionalInfo?: Record<string, unknown>;
}

export class ErrorReporter {
    private static instance: ErrorReporter;
    private errors: Array<{ error: AppError; context: ErrorContext }> = [];
    private readonly maxErrors = 50;

    private constructor() {}

    public static getInstance(): ErrorReporter {
        if (!ErrorReporter.instance) {
            ErrorReporter.instance = new ErrorReporter();
        }
        return ErrorReporter.instance;
    }

    public reportError(error: AppError, context: Partial<ErrorContext> = {}) {
        const errorContext: ErrorContext = {
            ...context,
            timestamp: Date.now(),
            route: window.location.pathname
        };

        this.errors.push({ error, context: errorContext });

        // Keep only the last maxErrors
        if (this.errors.length > this.maxErrors) {
            this.errors = this.errors.slice(-this.maxErrors);
        }

        // Log to console in development
        if (import.meta.env.DEV) {
            console.error('Error reported:', {
                error,
                context: errorContext
            });
        }

        // Here you could send errors to your error tracking service
        // Example: sendToErrorTrackingService(error, errorContext);
    }

    public getRecentErrors() {
        return [...this.errors];
    }

    public clearErrors() {
        this.errors = [];
    }
}
