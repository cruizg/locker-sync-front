import { UploadTaskStatus } from "@/store/ui/ui-upload";

interface UploadProcessorArgs {
  taskId: string;
  formData: FormData;
  token: string;
  updateUploadTask: (
    id: string,
    updates: {
      status?: UploadTaskStatus;
      progress?: number;
      errorMessage?: string;
    },
  ) => void;
  refreshFileManager: () => void;
}

const sendFormData = (
  formData: FormData,
  token: string,
  onProgress?: (percent: number) => void,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/items`);
    xhr.setRequestHeader("x-token", token);
    xhr.timeout = 300000;

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          resolve(xhr.responseText);
        }
      } else {
        reject(new Error(xhr.responseText || `Error ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(formData);
  });
};

export const processUploadTask = async ({
  taskId,
  formData,
  token,
  updateUploadTask,
  refreshFileManager,
}: UploadProcessorArgs): Promise<void> => {
  try {
    const type = formData.get("type");

    updateUploadTask(taskId, {
      status: "uploading",
      progress: 0,
    });

    // 📁 CARPETA → solo crear
    if (type === "folder") {
      const response= await sendFormData(formData, token);

      updateUploadTask(taskId, {
        status: "completed",
        progress: 100,
      });

      refreshFileManager();
      return response;
    }

    // 📄 ARCHIVO → subir
    if (type === "file") {
      await sendFormData(formData, token, (p) => {
        updateUploadTask(taskId, {
          progress: Math.min(p, 95),
        });
      });

      updateUploadTask(taskId, {
        status: "completed",
        progress: 100,
      });

      refreshFileManager();
      return;
    }

    throw new Error("Unknown upload type");
  } catch (error) {
    updateUploadTask(taskId, {
      status: "failed",
      errorMessage:
        error instanceof Error ? error.message : "Upload failed",
    });
  }
};