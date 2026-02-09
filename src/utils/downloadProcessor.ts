import axios from 'axios';
import useDownloadStore from '../store/ui/ui-download';
import { saveAs } from 'file-saver'; // This library is not installed, but commonly used for client-side file saving.
                                      // User will need to install it: `npm install file-saver @types/file-saver`

interface DownloadOptions {
    id: string; // The ID of the download task in the store
    url: string;
    fileName: string;
    token?: string; // Optional token for authenticated downloads
}

export const downloadProcessor = async ({ id, url, fileName, token }: DownloadOptions) => {
    const { updateDownloadTask } = useDownloadStore.getState();

    updateDownloadTask(id, { status: 'downloading' });

    try {
        const response = await axios.get(url, {
            responseType: 'blob', // Important for downloading files
            headers: token ? { 'x-token': token } : {},
            onDownloadProgress: (progressEvent) => {
                const total = progressEvent.total;
                const current = progressEvent.loaded;
                let percentCompleted = 0;
                if (total) {
                    percentCompleted = Math.floor((current * 100) / total);
                }
                updateDownloadTask(id, { progress: percentCompleted });
            },
        });

        // Save the file using file-saver
        saveAs(response.data, fileName);

        updateDownloadTask(id, { status: 'completed', progress: 100 });
        console.log(`Download of ${fileName} completed!`);
    } catch (error: any) {
        console.error(`Download of ${fileName} failed:`, error);
        updateDownloadTask(id, {
            status: 'failed',
            errorMessage: error.message || 'Unknown error',
            progress: 0,
        });
    }
};
