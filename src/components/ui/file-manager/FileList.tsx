"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useFileStore from "@/store/ui/ui-file";
import { getFilePreview } from "./FilePreview";
import { getSize } from "@/utils/getSize";
import { getTime } from "@/utils";
import { useFileManager } from "@/contexts/FileManagerContext";
import { ActionBar } from "./ActionBar";
import { ShareModal } from "./ShareModal";
import { ContextMenu, ContextMenuTrigger } from "../context-menu";
import { GridSkeleton } from "../skeleton/GridSkeleton";
import { ListSkeleton } from "../skeleton/ListSkeleton";
import { EmptyState } from "../file-not-found/EmtyState";
import useUploadStore from "@/store/ui/ui-upload";
import { Upload, FileUp } from "lucide-react";
import { cn } from "@/lib/utils";

function createDoubleTapHandler(callback: () => void, delay = 250) {
  let lastTap = 0;

  return () => {
    const now = Date.now();
    if (now - lastTap < delay) {
      callback();
    }
    lastTap = now;
  };
}

export const FileList = React.memo(() => {
  const router = useRouter();
  const {
    items,
    loading,
    loadNextPage,
    hasMore,
    path: contextPath,
  } = useFileManager();
  const ruta = contextPath ?? null;
  const { addUploadTask } = useUploadStore();
  const createTempId = () => crypto.randomUUID();
  const { layoutType } = useFileStore((state) => ({
    layoutType: state.layoutType,
  }));

  const [shareItem, setShareItem] = useState<any | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const layoutClasses: Record<string, string> = {
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
    list: "flex flex-col",
  };

  /* -------------------------
    Drag & Drop Handlers
  -------------------------- */

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragCounter((prev) => prev + 1);

    // Verificar si hay archivos siendo arrastrados
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragCounter((prev) => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragging(false);
      }
      return newCounter;
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  //   const handleDrop = useCallback(
  //     (e: React.DragEvent) => {
  //       e.preventDefault();
  //       e.stopPropagation();

  //       setIsDragging(false);
  //       setDragCounter(0);

  //       const files = Array.from(e.dataTransfer.files);

  //       if (files.length === 0) return;

  //       // Procesar cada archivo usando la misma lógica de AddFile
  //       files.forEach((file) => {
  //         addUploadTask({
  //           type: "file",
  //           name: file.name,
  //           parent_id: ruta,
  //           file,
  //         });
  //       });

  //       console.log(`📁 ${files.length} archivo(s) añadido(s) a la cola de subida`);
  //     },
  //     [ruta, addUploadTask]
  //   );

  const handleDirectoryEntry = (
    directoryEntry: FileSystemDirectoryEntry,
    parentTempId?: string,
  ) => {
    const folderTempId = createTempId();

    // 📁 crear tarea carpeta
    addUploadTask({
      id: folderTempId,
      tempId: folderTempId,
      type: "folder",
      name: directoryEntry.name,
      parentTempId, // 👈 CLAVE
      ...(parentTempId ? {} : { parent_id: ruta }),
    });

    const reader = directoryEntry.createReader();

    reader.readEntries((entries) => {
      entries.forEach((fileEntry) => {
        // 📄 archivo
        if (fileEntry.isFile) {
          const entry = fileEntry as FileSystemFileEntry;

          entry.file((file) => {
            addUploadTask({
              id: createTempId(),
              tempId: createTempId(),
              type: "file",
              name: file.name,
              file,
              parentTempId: folderTempId, // 👈 NO parent_id
            //   parent_id: ruta
            });
          });
        }

        // 📁 subcarpeta (recursivo)
        if (fileEntry.isDirectory) {
          const dirEntry = fileEntry as FileSystemDirectoryEntry;
          handleDirectoryEntry(dirEntry, folderTempId);
        }
      });
    });
  };
  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(false);
      setDragCounter(0);

      const items = e.dataTransfer.items;
      if (!items || items.length === 0) return;

      for (const item of Array.from(items)) {
        const fileEntry = item.webkitGetAsEntry?.();
        if (!fileEntry) continue;

        // ======================
        // 📄 ARCHIVO
        // ======================
        if (fileEntry.isFile) {
          const entry = fileEntry as FileSystemFileEntry;
          entry.file((file) => {
            addUploadTask({
              id: createTempId(),
              tempId: createTempId(),
              type: "file",
              name: file.name,
              parent_id: ruta,
              file,
            });
          });
        }

        // ======================
        // 📁 CARPETA
        // ======================
        if (fileEntry.isDirectory) {
          const dirEntry = fileEntry as FileSystemDirectoryEntry;
        //   handleDirectoryEntry(dirEntry, ruta ? undefined : undefined);
          handleDirectoryEntry(dirEntry);
        }
      }
    },
    [ruta, addUploadTask],
  );
  /* -------------------------
    Helpers
  -------------------------- */

  const openFile = (file: any) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    const previewable = [
      "pdf",
      "png",
      "jpg",
      "jpeg",
      "gif",
      "webp",
      "mp4",
      "webm",
      "mp3",
      "wav",
    ];

    if (previewable.includes(ext!)) {
      window.open(file.path, "_blank", "noopener,noreferrer");
      return;
    }

    const link = document.createElement("a");
    link.href = file.path;
    link.download = file.name;
    link.click();
  };

  const handleOpen = (item: any) => {
    if (item.type === "folder") {
      router.push(`/folders/${item.id || item.uid}`);
    } else {
      openFile(item);
    }
  };

  const handleShare = (item: any) => setShareItem(item);
  const handleDownload = (item: any) => openFile(item);

  /* -------------------------
    Infinite scroll
  -------------------------- */

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        loadNextPage();
      }
    },
    [hasMore, loading, loadNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "120px",
      threshold: 0.3,
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  /* -------------------------
    Loading
  -------------------------- */
  if (loading && items.length === 0) {
    return layoutType === "grid" ? <GridSkeleton /> : <ListSkeleton />;
  }

  if (!loading && items.length === 0) {
    return (
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="relative"
      >
        <EmptyState />

        {/* Drag & Drop Overlay para Empty State */}
        {isDragging && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-primary/5 backdrop-blur-sm border-4 border-dashed border-primary rounded-2xl">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-10 h-10 text-primary animate-bounce" />
              </div>
              <div>
                <p className="text-xl font-semibold text-primary">
                  Suelta los archivos aquí
                </p>
                <p className="text-sm text-muted-foreground">
                  Se subirán a esta carpeta
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* -------------------------
    Render
  -------------------------- */

  return (
    <>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative px-2 md:px-0",
          layoutClasses[layoutType],
          isDragging && "opacity-50",
        )}
      >
        {items.map((item, index) => {
          const extension = item.name.includes(".")
            ? item.name.split(".").pop()
            : null;
          const isFolder = extension === null;
          const onDoubleTap = createDoubleTapHandler(() => handleOpen(item));

          return (
            <ContextMenu key={index}>
              <ContextMenuTrigger>
                {/* ---------- LIST ---------- */}
                {layoutType === "list" && (
                  <div
                    onClick={onDoubleTap}
                    className="group grid grid-cols-1 md:grid-cols-[minmax(280px,1fr)_120px_180px_48px]
                               items-center gap-2 md:gap-4 px-4 md:px-6 py-3
                               hover:bg-blue-50 dark:hover:bg-slate-700/40
                               border-b border-zinc-200 dark:border-slate-700
                               transition cursor-pointer"
                  >
                    {/* Nombre */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 text-zinc-500">
                        {getFilePreview(isFolder, extension!, item.path)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium text-zinc-800 dark:text-slate-200">
                          {item.name}
                        </p>
                        <p className="md:hidden text-xs text-zinc-500">
                          {getSize(isFolder ? 0 : item.size!)} ·{" "}
                          {getTime(item.updated_at)}
                        </p>
                      </div>
                    </div>

                    {/* Tamaño */}
                    <p className="hidden md:block text-sm text-zinc-500 text-right">
                      {getSize(isFolder ? 0 : item.size!)}
                    </p>

                    {/* Fecha */}
                    <p className="hidden md:block text-sm text-zinc-500">
                      {getTime(item.updated_at)}
                    </p>

                    {/* Acciones */}
                    <div className="flex justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                      <ActionBar
                        item={item}
                        layout="list"
                        onShare={handleShare}
                        onDownload={handleDownload}
                      />
                    </div>
                  </div>
                )}

                {/* ---------- GRID ---------- */}
                {layoutType === "grid" && (
                  <div
                    onDoubleClick={() => handleOpen(item)}
                    className="relative rounded-xl p-4 cursor-pointer transition
                            bg-white dark:bg-slate-800
                            border border-zinc-200 dark:border-slate-700
                            shadow-sm
                            hover:shadow-md
                            hover:bg-blue-50 dark:hover:bg-blue-950/60
                            "
                  >
                    <ActionBar
                      item={item}
                      layout="grid"
                      onShare={handleShare}
                      onDownload={handleDownload}
                    />

                    <h2 className="flex items-center gap-2 truncate text-sm font-medium text-zinc-800 dark:text-slate-200 mb-2">
                      {getFilePreview(isFolder, extension!, item.path)}
                      {item.name}
                    </h2>

                    <div className="flex items-center justify-center h-24 lg:h-32 bg-zinc-50 dark:bg-slate-700/60 rounded-lg mb-3" />

                    <p className="text-sm text-zinc-500">
                      {getSize(isFolder ? 0 : item.size!)}
                    </p>

                    <p className="text-sm text-zinc-500">
                      {getTime(item.updated_at)}
                    </p>
                  </div>
                )}
              </ContextMenuTrigger>
            </ContextMenu>
          );
        })}

        <div ref={observerRef} className="h-1" />

        {/* Drag & Drop Overlay */}
        {isDragging && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-4 border-4 border-dashed border-primary rounded-3xl bg-primary/5 backdrop-blur-sm animate-pulse" />

            <div className="relative z-10 text-center space-y-6 bg-background/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-2 border-primary">
              <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                <FileUp className="w-12 h-12 text-primary-foreground animate-bounce" />
              </div>

              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">
                  Suelta para subir archivos
                </p>
                <p className="text-sm text-muted-foreground">
                  Los archivos se añadirán a la carpeta actual
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Upload className="w-4 h-4" />
                <span>Subida masiva habilitada</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Share modal */}
      <ShareModal
        open={!!shareItem}
        item={shareItem}
        onClose={() => setShareItem(null)}
      />
    </>
  );
});
