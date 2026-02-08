"use client";

import React from "react";
import useUploadStore from "@/store/ui/ui-upload";
import { Button } from "../button"; // Assuming you have a Button component
import {
  X,
  Minus,
  ChevronUp,
  FileText,
  Folder,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Progress } from "../progress"; // Assuming you have a Progress component
import { UploadTaskType, UploadTaskStatus } from "@/store/ui/ui-upload"; // Import types

export function UploadDialog() {
  const { tasks, isMinimized, toggleMinimized, removeUploadTask } =
    useUploadStore();

  // Log component rendering and tasks state
  // console.log(
  //   "UploadDialog rendered. Tasks count:",
  //   tasks.length,
  //   "Minimized:",
  //   isMinimized,
  //   "Tasks:",
  //   tasks,
  // );

  // Temporarily remove conditional rendering to ensure it's always mounted for debugging
  // if (tasks.length === 0 && tasks.filter(task => task.status === 'completed' || task.status === 'failed').length === 0) return null;

  const activeTasks = tasks.filter(
    (task) => task.status !== "completed" && task.status !== "failed",
  );
  const completedOrFailedTasks = tasks.filter(
    (task) => task.status === "completed" || task.status === "failed",
  );

  // Only render if there are any tasks to show, even completed/failed ones
  if (tasks.length === 0 && completedOrFailedTasks.length === 0) {
    // console.log("UploadDialog: No tasks to display, returning null.");
    return null;
  }

  const getIcon = (type: UploadTaskType) => {
    if (type === "file") return <FileText className="h-4 w-4 text-blue-500" />;
    if (type === "folder")
      return <Folder className="h-4 w-4 text-yellow-500" />;
    return null;
  };

  const getStatusIcon = (status: UploadTaskStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "uploading":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin text-purple-500" />; // New icon for processing
      case "pending":
        return <Loader2 className="h-4 w-4 animate-spin text-gray-500" />;
      default:
        return null;
    }
  };
  const allTasksFinished =
    tasks.length > 0 &&
    tasks.every(
      (task) => task.status === "completed" || task.status === "failed",
    );

  return (
    <div
      className={`fixed bottom-4 right-20 z-[999] w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out
                        ${isMinimized ? "h-12 overflow-hidden" : "max-h-[calc(100vh-3rem)] overflow-y-auto"}`}
    >
      <div
        className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
        onClick={toggleMinimized}
      >
        <h3 className="text-md font-semibold text-gray-800 dark:text-white">
          {activeTasks.length > 0
            ? `Subiendo (${activeTasks.length})`
            : "Completado"}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleMinimized();
            }}
          >
            {isMinimized ? (
              <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Minus className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </Button>
          {allTasksFinished && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                tasks.forEach((task) => removeUploadTask(task.id));
              }}
            >
              <X className="h-5 w-5 text-gray-600 hover:text-red-500" />
            </Button>
          )}
        </div>
      </div>

      {!isMinimized && (
        <div className="p-3 space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-3 text-sm">
              <div className="flex-shrink-0">{getIcon(task.type)}</div>
              <div className="flex-grow">
                <p className="font-medium text-gray-700 dark:text-gray-200 truncate">
                  {task.name}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusIcon(task.status)}
                  <span className="text-gray-500 dark:text-gray-400">
                    {task.status === "uploading" || task.status === "processing"
                      ? `${task.progress}%`
                      : task.status}
                  </span>
                  {(task.status === "uploading" ||
                    task.status === "processing") && (
                    <Progress value={task.progress} className="w-24 h-2" />
                  )}
                </div>
                {task.errorMessage && (
                  <p className="text-red-500 text-xs mt-1">
                    {task.errorMessage}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeUploadTask(task.id)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
