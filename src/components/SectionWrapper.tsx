import React from 'react';
import { AppError } from '../utils/errorHandlers';
import { NetworkErrorState, GenericErrorState } from './ErrorStates';

interface SectionWrapperProps {
    isLoading: boolean;
    error: AppError | null;
    LoadingComponent: React.ComponentType;
    children: React.ReactNode;
}

export function SectionWrapper({ isLoading, error, LoadingComponent, children }: SectionWrapperProps) {
    if (isLoading) {
        return <LoadingComponent />;
    }

    if (error) {
        if (error.type === 'NETWORK_ERROR') {
            return <NetworkErrorState onRetry={() => window.location.reload()} />;
        }
        return <GenericErrorState error={error} onRetry={() => window.location.reload()} />;
    }

    return <>{children}</>;
}
