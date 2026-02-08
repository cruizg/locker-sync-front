'use client';

import { useFileManager } from '@/contexts/FileManagerContext';
import { AddFile } from '@/components/ui/file-manager/AddFile';
import { FileList } from '@/components/ui/file-manager/FileList';
import SearchBar from '@/components/ui/SearchBar';
import StickyHeader from '@/components/ui/file-manager/StickyHeader';

export default function FileManagerClientPage() {
    // const { path, refresh } = useFileManager();

    return (
        <>
            <SearchBar/>
            <StickyHeader />
            <FileList />
            {/* <AddFile refresh={refresh} path={path} /> */}
            <AddFile />
        </>
    );
}
