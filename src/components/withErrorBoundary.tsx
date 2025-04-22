import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { NetworkErrorState } from './ErrorStates';

export interface WithErrorBoundaryProps {
    fallback?: React.ReactNode;
}

export function withErrorBoundary<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    options: WithErrorBoundaryProps = {}
) {
    return function WithErrorBoundaryWrapper(props: P) {
        return (
            <ErrorBoundary
                fallback={
                    options.fallback ?? (
                        <div className="max-w-3xl mx-auto">
                            <NetworkErrorState onRetry={() => window.location.reload()} />
                        </div>
                    )
                }
            >
                <WrappedComponent {...props} />
            </ErrorBoundary>
        );
    };
}
