"use client";

import { useEffect, useRef } from "react";
import useUploadStore, { UploadTask } from "@/store/ui/ui-upload";
import { processUploadTask } from "@/utils/uploadProcessor";
import { useFileManager } from "@/contexts/FileManagerContext";
import { useSession } from "next-auth/react";

const MAX_CONCURRENT_UPLOADS = 3;

export function UploadManager() {
  const { tasks, updateUploadTask } = useUploadStore();
  const { refresh } = useFileManager();
  const { data: session } = useSession();

  // 🔗 Mapa tempId (frontend) → id real (backend)
  const folderIdMap = useRef<Map<string, string>>(new Map());

  const token = session?.user?.token;
  const userId = session?.user?.uid;

  useEffect(() => {
    if (!token || !userId) return;

    const processQueue = () => {
      const activeCount = tasks.filter(
        (t) => t.status === "uploading" || t.status === "processing",
      ).length;

      const slotsAvailable = MAX_CONCURRENT_UPLOADS - activeCount;
      if (slotsAvailable <= 0) return;

      // 🔎 1️⃣ tareas pendientes y listas
      const pendingTasks = tasks.filter((task) => {
        if (task.status !== "pending") return false;

        // Root (Home)
        if (!task.parentTempId) return true;

        // Hijos → solo si el padre YA existe en backend
        return folderIdMap.current.has(task.parentTempId);
      });

      if (pendingTasks.length === 0) return;

      // 🧱 2️⃣ PRIORIDAD: carpetas primero
      const pendingFolders = pendingTasks.filter(
        (t) => t.type === "folder",
      );

      const pendingFiles = pendingTasks.filter(
        (t) => t.type === "file",
      );

      let tasksToStart: UploadTask[] = [];

      if (pendingFolders.length > 0) {
        tasksToStart = pendingFolders.slice(0, slotsAvailable);
      } else {
        tasksToStart = pendingFiles.slice(0, slotsAvailable);
      }

      // 🚀 3️⃣ ejecutar
      for (const task of tasksToStart) {
        updateUploadTask(task.id, {
          status: "uploading",
          progress: 0,
        });

        processUploadTask({
          taskId: task.id,
          formData: createFormData(task),
          updateUploadTask,
          refreshFileManager: refresh,
          token,
        }).then((response: any) => {
          // 📁 si es carpeta → guardar id real
          if (task.type === "folder") {
            const realId =
              response?.items?.[0]?.uid ||
              response?.items?.[0]?.id;

            if (realId) {
              folderIdMap.current.set(task.tempId, realId);
            }
          }

          updateUploadTask(task.id, { status: "completed" });
        });
      }
    };

    const timeout = setTimeout(processQueue, 50);
    return () => clearTimeout(timeout);
  }, [tasks, token, userId, updateUploadTask, refresh]);

  // ------------------------------------
  // 🧾 FormData builder (CRÍTICO)
  // ------------------------------------
  const createFormData = (task: UploadTask): FormData => {
    const formData = new FormData();

    formData.append("type", task.type);
    formData.append("client_id", userId!);
    formData.append("name", task.name);

    // 📌 1️⃣ Padre REAL (ruta actual)
    if (task.parent_id) {
      formData.append("parent_id", task.parent_id);
    }
    // 📌 2️⃣ Padre creado en frontend
    else if (task.parentTempId) {
      const realParentId = folderIdMap.current.get(task.parentTempId);
      if (realParentId) {
        formData.append("parent_id", realParentId);
      }
    }

    // 📄 archivo
    if (task.type === "file" && task.file) {
      formData.append("files", task.file);
    }

    return formData;
  };

  return null; // componente headless
}