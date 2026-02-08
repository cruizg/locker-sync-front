import { create } from 'zustand';
type LayoutType = 'grid' | 'list';

interface FileStore {
    layoutType: LayoutType;
    setLayoutType: (type: LayoutType) => void;
}

const useFileStore = create<FileStore>((set) => ({
    layoutType: 'list',
    setLayoutType: (type) => set({ layoutType: type }),
}));

export default useFileStore;