import { create } from 'zustand';

export type DownloadTaskStatus = 'pending' | 'downloading' | 'completed' | 'failed';

export interface DownloadTask {
    id: string; // Unique ID for the download task
    name: string; // Display name of the file
    url: string; // URL to download the file from
    status: DownloadTaskStatus;
    progress: number; // 0-100
    errorMessage?: string;
    // Potentially add other metadata like size, icon, etc.
}

interface DownloadState {
    tasks: DownloadTask[];
    isMinimized: boolean;
    addDownloadTask: (taskDetails: Omit<DownloadTask, 'id' | 'status' | 'progress'>) => string; // Returns new task ID
    updateDownloadTask: (id: string, updates: Partial<DownloadTask>) => void;
    removeDownloadTask: (id: string) => void;
    toggleMinimized: () => void;
    clearCompletedOrFailedTasks: () => void;
}

const useDownloadStore = create<DownloadState>((set) => ({
    tasks: [],
    isMinimized: false,

    addDownloadTask: (taskDetails) => {
        const id = Date.now().toString() + Math.random().toString(36).substring(2, 9); // Simple unique ID
        const newTask: DownloadTask = {
            id,
            ...taskDetails,
            status: 'pending',
            progress: 0,
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
        return id;
    },

    updateDownloadTask: (id, updates) => {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, ...updates } : task
            ),
        }));
    },

    removeDownloadTask: (id) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
        }));
    },

    toggleMinimized: () => {
        set((state) => ({ isMinimized: !state.isMinimized }));
    },

    clearCompletedOrFailedTasks: () => {
        set((state) => ({
            tasks: state.tasks.filter(
                (task) => task.status !== 'completed' && task.status !== 'failed'
            ),
        }));
    },
}));

export default useDownloadStore;
