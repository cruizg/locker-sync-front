'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useItems from '@/hooks/useItems';

interface FileManagerContextType {
    items: any[]; // Replace 'any' with your actual item type
    loading: boolean;
    loadNextPage: () => void;
    hasMore: boolean;
    refresh: () => void;
    path: string;
    totalSize: number;          // 👈 NUEVO
    // refreshTotalSize: () => void;
}

const FileManagerContext = createContext<FileManagerContextType | undefined>(undefined);

export const FileManagerProvider = ({ children, path: initialPath }: { children: ReactNode; path: string }) => {
    const { items, loading, loadNextPage, hasMore, refresh,totalSize } = useItems<any>(1, initialPath);

    return (
        <FileManagerContext.Provider value={{ items, loading, loadNextPage, hasMore, refresh, path: initialPath,totalSize }}>
            {children}
        </FileManagerContext.Provider>
    );
};

export const useFileManager = () => {
    const context = useContext(FileManagerContext);
    if (context === undefined) {
        throw new Error('useFileManager must be used within a FileManagerProvider');
    }
    return context;
};
