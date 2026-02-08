"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { File as FileIcon, FolderPlus, Upload, Plus, X } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../sidebar";
import { Input } from "../input";
import { Button } from "../button";
import { useFileManager } from "@/contexts/FileManagerContext";
import useUploadStore from "@/store/ui/ui-upload";
import { cn } from "@/lib/utils";

export function AddFile() {
  const { path: contextPath } = useFileManager();
  const ruta = contextPath ?? null;
  const { addUploadTask } = useUploadStore();
  const { isMobile } = useSidebar();

  const [folderName, setFolderName] = useState("");
  const [open, setOpen] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const createTempId = () => crypto.randomUUID();
  /* -------------------------
     Handlers
  -------------------------- */

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;

      const filesArray = Array.from(e.target.files);
      filesArray.forEach((file) => {
        const tempId = createTempId();
        addUploadTask({
          id: tempId,
          tempId: tempId,
          type: "file",
          name: file.name,
          parent_id: ruta,
          file,
        });
      });

      e.target.value = "";
      setOpen(false);
    },
    [ruta, addUploadTask],
  );

  const handleCreateFolder = useCallback(() => {
    if (!folderName.trim()) return;
    const tempId = createTempId();

    addUploadTask({
      id: tempId,
      tempId: tempId,
      type: "folder",
      name: folderName.trim(),
      parent_id: ruta,
    });

    setFolderName("");
    setIsCreatingFolder(false);
    setOpen(false);
  }, [folderName, ruta, addUploadTask]);

  const handleOpenFolderCreation = useCallback(() => {
    setIsCreatingFolder(true);
    // Focus en el input después de un pequeño delay para que se renderice
    setTimeout(() => folderInputRef.current?.focus(), 100);
  }, []);

  const handleCancelFolderCreation = useCallback(() => {
    setIsCreatingFolder(false);
    setFolderName("");
  }, []);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset estados al cerrar
      setIsCreatingFolder(false);
      setFolderName("");
    }
  }, []);

  /* -------------------------
     Render
  -------------------------- */

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        aria-label="Seleccionar archivos"
      />

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 ">
        {/* Backdrop/fondo del FAB */}
        {/* <div className="absolute -inset-2 bg-background/80 backdrop-blur-sm rounded-full -z-10" /> */}
        {/* <div className="absolute -inset-2 bg-background/80 backdrop-blur-sm rounded-full -z-10 pointer-events-none" /> */}
        <div className="group fixed bottom-6 right-6 z-50">
          <DropdownMenu open={open} onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                className={cn(
                  "relative rounded-full w-14 h-14 shadow-2xl",
                  "bg-gray-800",
                  "border-4 border-background",
                  "ring-2 ring-primary/20",
                  "transition-all duration-200 ease-out",
                )}
              >
                {/* Fondo del FAB */}
                <span
                  aria-hidden
                  className="absolute -inset-2 rounded-full
                bg-background/80 backdrop-blur-sm
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                pointer-events-none
                -z-10
                "
                />

                {/* Contenido */}
                <span
                  className={cn(
                    "relative flex items-center justify-center",
                    "transition-transform duration-200 ease-out",
                    "group-hover:scale-110 group-active:scale-95",
                  )}
                >
                  <Plus
                    className={cn(
                      "w-6 h-6 transition-transform duration-200",
                      open && "rotate-45",
                    )}
                  />
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={isMobile ? "top" : "left"}
              align="end"
              sideOffset={12}
              className={cn(
                "w-80 rounded-2xl p-0 shadow-2xl border-2",
                "bg-background/95 backdrop-blur-xl",
                "animate-in fade-in-0 zoom-in-95",
              )}
            >
              {/* Header */}
              <div className="px-4 py-3 border-b bg-muted/50">
                <DropdownMenuLabel className="text-sm font-semibold text-foreground">
                  Crear o subir contenido
                </DropdownMenuLabel>
              </div>

              {/* Conditional Content */}
              {!isCreatingFolder ? (
                <>
                  {/* Quick Actions */}
                  <DropdownMenuGroup className="p-2">
                    <DropdownMenuItem
                      onSelect={() => fileInputRef.current?.click()}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer",
                        "hover:bg-gray/500 focus:bg-gray/500",
                        "transition-colors duration-150",
                      )}
                    >
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Subir archivos</p>
                        <p className="text-xs text-muted-foreground">
                          Selecciona uno o varios archivos
                        </p>
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault(); // ← AGREGAR ESTO
                        handleOpenFolderCreation();
                      }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer",
                        "hover:bg-gray/500 focus:bg-gray/500",
                        "transition-colors duration-150",
                      )}
                    >
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <FolderPlus className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Nueva carpeta</p>
                        <p className="text-xs text-muted-foreground">
                          Organiza tus archivos
                        </p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              ) : (
                <>
                  {/* Folder Creation Form */}
                  <div className="p-4 space-y-4">
                    {/* Header con botón cerrar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                          <FolderPlus className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h3 className="font-semibold text-sm">Nueva carpeta</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelFolderCreation}
                        className="h-8 w-8 p-0 rounded-full hover:bg-muted"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Input */}
                    <div className="space-y-2">
                      <label
                        htmlFor="folder-name"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        Nombre de la carpeta
                      </label>
                      <Input
                        id="folder-name"
                        ref={folderInputRef}
                        placeholder="Ej: Documentos 2024"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCreateFolder();
                            e.preventDefault();
                          }
                          if (e.key === "Escape") {
                            handleCancelFolderCreation();
                            e.preventDefault();
                          }
                        }}
                        className={cn(
                          "h-11 rounded-lg",
                          "focus-visible:ring-2 focus-visible:ring-primary",
                        )}
                        autoComplete="off"
                      />
                      <p className="text-xs text-muted-foreground">
                        Presiona Enter para crear o Esc para cancelar
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleCancelFolderCreation}
                        className="flex-1 rounded-lg"
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="sm"
                        variant={"outline"}
                        onClick={handleCreateFolder}
                        disabled={!folderName.trim()}
                        className="flex-1 rounded-lg bg-black text-white"
                      >
                        Crear carpeta
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
