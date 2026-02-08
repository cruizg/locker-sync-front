import React from 'react';
import { 
    Folder, 
    FileImage, 
    FileVideo, 
    FileAudio, 
    FileText, 
    FileSpreadsheet, 
    FileCode, 
    File 
} from 'lucide-react'; // Asegúrate de ajustar esta importación según tu proyecto

export const getFilePreview = (isFolder: boolean, extension: string, path: string) => {
    if (isFolder) {
        return <Folder className="w-6 h-5 text-gray-500 dark:text-blue-300" fill="currentColor" />;
    }

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const videoExtensions = ['mp4', 'mkv', 'avi', 'mov', 'webm'];
    const audioExtensions = ['mp3', 'wav', 'ogg', 'flac'];
    const documentExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt'];
    const codeExtensions = ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'json', 'py', 'java', 'c', 'cpp'];

    if (imageExtensions.includes(extension)) {
        return <FileImage className="w-6 h-6 text-green-500" />;
    }
    if (videoExtensions.includes(extension)) {
        return <FileVideo className="w-6 h-6 text-purple-500" />;
    }
    if (audioExtensions.includes(extension)) {
        return <FileAudio className="w-6 h-6 text-yellow-500" />;
    }
    if (documentExtensions.includes(extension)) {
        switch (extension) {
            case 'pdf':
                return <FileText className="w-6 h-6 text-red-500" />;
            case 'doc':
            case 'docx':
                return <FileText className="w-6 h-6 text-blue-500" />;
            case 'ppt':
            case 'pptx':
                return <FileText className="w-6 h-6 text-orange-500" />;
            case 'xls':
            case 'xlsx':
                return <FileSpreadsheet className="w-6 h-6 text-green-500" />;
            case 'txt':
                return <FileText className="w-6 h-6 text-gray-500" />;
        }
    }
    if (codeExtensions.includes(extension)) {
        return <FileCode className="w-6 h-6 text-indigo-500" />;
    }

    // Ícono genérico para extensiones desconocidas
    return <File className="w-6 h-6 text-gray-400" />;
};