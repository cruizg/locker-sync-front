import { create } from 'zustand';

export type UploadTaskType = 'file' | 'folder';
export type UploadTaskStatus = 'pending' | 'uploading' | 'processing' | 'completed' | 'failed';

// export interface UploadTask {
//     id: string;
//     tempId?: string;
//     type: UploadTaskType;
//     name: string; // Display name (file.name or folder name)
//     status: UploadTaskStatus;
//     progress: number; // 0-100
//     errorMessage?: string;
//     parent_id?: string;
//     file?: File; // Optional: Only for type 'file'
// }
export interface UploadTask {
  id: string;              // ID interno (store)
  tempId: string;          // ID lógico frontend
  parentTempId?: string;   // relación lógica (carpetas)
  parent_id?: string;      // ID real backend
  type: 'file' | 'folder';
  name: string;
  status: UploadTaskStatus;
  progress: number;
  file?: File;
  errorMessage?: string;
}
// interface AddTaskPayload extends Omit<UploadTask, 'id' | 'status' | 'progress'> {}
interface AddTaskPayload extends Omit<UploadTask, 'status' | 'progress'> {}
interface UploadState {
    tasks: UploadTask[];
    isMinimized: boolean;
    addUploadTask: (task: AddTaskPayload) => string; // Returns new task ID
    updateUploadTask: (id: string, updates: Partial<UploadTask>) => void;
    removeUploadTask: (id: string) => void;
    toggleMinimized: () => void;
    clearCompletedOrFailedTasks: () => void; // New action
}

const useUploadStore = create<UploadState>((set) => ({
    tasks: [],
    isMinimized: false,

    addUploadTask: (taskDetails) => {
        // const id = Date.now().toString() + Math.random().toString(36).substring(2, 9); // Simple unique ID
        const newTask: UploadTask = {
            // id,
            ...taskDetails,
            status: 'pending',
            progress: 0,
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
        // return id;
        return taskDetails.id;
    },

    updateUploadTask: (id, updates) => {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, ...updates } : task
            ),
        }));
    },

    removeUploadTask: (id) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
        }));
    },

    toggleMinimized: () => {
        set((state) => ({ isMinimized: !state.isMinimized }));
    },

    clearCompletedOrFailedTasks: () => { // New action implementation
        set((state) => ({
            tasks: state.tasks.filter(
                (task) => task.status !== 'completed' && task.status !== 'failed'
            ),
        }));
    },
}));

export default useUploadStore;
