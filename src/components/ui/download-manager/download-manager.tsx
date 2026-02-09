'use client';

import React from 'react';
import useDownloadStore from '@/store/ui/ui-download';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator'; // Assuming a Separator component exists
import { Progress } from '@/components/ui/progress'; // Assuming a Progress component exists
import { Button } from '@/components/ui/button'; // Assuming a Button component exists
import { ScrollArea } from '@/components/ui/scroll-area'; // Assuming a ScrollArea component exists
import {
    DownloadCloud,
    X,
    Minimize2,
    Maximize2,
    CheckCircle2,
    AlertCircle,
    File,
    Folder,
} from 'lucide-react'; // Assuming lucide-react is installed

export const DownloadManager = () => {
    const { tasks, isMinimized, toggleMinimized, removeDownloadTask, clearCompletedOrFailedTasks } = useDownloadStore();

    const activeDownloads = tasks.filter(task => task.status === 'downloading' || task.status === 'pending');
    const completedDownloads = tasks.filter(task => task.status === 'completed');
    const failedDownloads = tasks.filter(task => task.status === 'failed');

    const hasTasks = tasks.length > 0;

    if (!hasTasks) {
        return null;
    }

    return (
        <div
            className={cn(
                'fixed bottom-4 right-4 z-50 w-80 rounded-lg bg-background shadow-lg transition-all duration-300',
                isMinimized ? 'h-12 overflow-hidden' : 'h-auto max-h-[80vh]',
                !hasTasks && isMinimized && 'hidden' // Hide completely if no tasks and minimized
            )}
        >
            <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-2">
                    <DownloadCloud className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-sm">Descargas ({activeDownloads.length})</h3>
                </div>
                <div className="flex items-center gap-1">
                    {hasTasks && (
                         <Button variant="ghost" size="icon" onClick={clearCompletedOrFailedTasks} className="h-8 w-8" title="Limpiar completados/fallidos">
                         <X className="h-4 w-4" />
                     </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={toggleMinimized} className="h-8 w-8">
                        {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {!isMinimized && hasTasks && (
                <ScrollArea className="max-h-[calc(80vh-60px)]">
                    <div className="p-3 space-y-3">
                        {activeDownloads.map(task => (
                            <div key={task.id} className="flex items-center gap-3">
                                <File className="h-5 w-5 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium truncate">{task.name}</p>
                                    <Progress value={task.progress} className="h-2 w-full" />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {task.status === 'downloading' && `Descargando: ${task.progress}%`}
                                        {task.status === 'pending' && `Pendiente`}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeDownloadTask(task.id)}
                                    className="h-8 w-8"
                                    title="Cancelar descarga"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}

                        {(completedDownloads.length > 0 || failedDownloads.length > 0) && activeDownloads.length > 0 && <Separator className="my-2" />}

                        {completedDownloads.map(task => (
                            <div key={task.id} className="flex items-center gap-3 text-green-500">
                                <CheckCircle2 className="h-5 w-5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium truncate">{task.name}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Completado</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeDownloadTask(task.id)}
                                    className="h-8 w-8"
                                    title="Remover de la lista"
                                >
                                    <X className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </div>
                        ))}

                        {failedDownloads.map(task => (
                            <div key={task.id} className="flex items-center gap-3 text-red-500">
                                <AlertCircle className="h-5 w-5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium truncate">{task.name}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Fallido: {task.errorMessage}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeDownloadTask(task.id)}
                                    className="h-8 w-8"
                                    title="Remover de la lista"
                                >
                                    <X className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    );
};
