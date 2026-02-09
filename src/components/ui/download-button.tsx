'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming Button component exists
import { DownloadIcon, Loader2 } from 'lucide-react'; // Add Loader2 for loading state
import useDownloadStore from '@/store/ui/ui-download';
import { downloadProcessor } from '@/utils/downloadProcessor';
import { useSession } from 'next-auth/react'; // Assuming NextAuth.js is used for session/token

interface DownloadButtonProps {
    fileId: string; // The unique ID of the file to download (for backend API)
    fileName: string; // The name of the file for saving
    // New prop: a function that fetches the actual download URL and token
    getDownloadDetails: (fileId: string) => Promise<{ url: string; token?: string }>;
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
}

export const DownloadButton = ({
    fileId,
    fileName,
    getDownloadDetails, // Use the new prop
    variant = "ghost",
    size = "icon",
    className
}: DownloadButtonProps) => {
    const { addDownloadTask, tasks } = useDownloadStore();
    const [isLoadingDetails, setIsLoadingDetails] = useState(false); // New loading state for fetching details

    // Check if a download for this fileId is already in progress or pending
    const isDownloading = tasks.some(task =>
        task.id === fileId && (task.status === 'downloading' || task.status === 'pending')
    );
    // Note: Changed `task.url === fileUrl` to `task.id === fileId` assuming fileId is unique and represents the item.

    const handleDownload = async () => {
        if (isDownloading || isLoadingDetails) {
            console.log(`Download for ${fileName} is already in progress or details are being fetched.`);
            return;
        }

        setIsLoadingDetails(true);
        try {
            const downloadDetails = await getDownloadDetails(fileId);
            if (!downloadDetails?.url) {
                console.error("No download URL received.");
                return; // Or show an error to the user
            }

            const taskId = addDownloadTask({
                name: fileName,
                url: downloadDetails.url,
            });

            // Pass the token obtained from getDownloadDetails
            downloadProcessor({ id: taskId, url: downloadDetails.url, fileName: fileName, token: downloadDetails.token });

        } catch (error) {
            console.error("Failed to get download details:", error);
            // Potentially add a failed task to the store here as well
        } finally {
            setIsLoadingDetails(false);
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            className={className}
            onClick={handleDownload}
            disabled={isDownloading || isLoadingDetails} // Disable if downloading or fetching details
            title={
                isLoadingDetails
                    ? "Obteniendo detalles de descarga..."
                    : isDownloading
                    ? "Descarga en progreso"
                    : `Descargar ${fileName}`
            }
        >
            {isLoadingDetails ? <Loader2 className="h-4 w-4 animate-spin" /> : <DownloadIcon className="h-4 w-4" />}
            <span className="sr-only">Descargar</span>
        </Button>
    );
};
