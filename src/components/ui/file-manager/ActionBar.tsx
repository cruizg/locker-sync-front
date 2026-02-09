"use client";

import { Share2, Download, Loader2 } from "lucide-react";
import { DownloadButton } from "../download-button";

type Props = {
  item: any;
  layout: "grid" | "list";
  onShare: (item: any) => void;
  onDownload: (fileId: string) => Promise<{
    url: string;
    token?: string;
  }>;
  // isDownloading:boolean
};

export function ActionBar({
  item,
  layout,
  onShare,
  onDownload,
  // isDownloading,
}: Props) {
  return (
    <div
      className={`
        ${layout === "grid" ? "absolute top-2 right-2" : "ml-auto"}
        flex gap-1 opacity-0 group-hover:opacity-100 transition duration-150
      `}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onShare(item);
        }}
        title="Compartir"
        aria-label="Compartir"
        className="p-1.5 rounded-md bg-white/80 hover:bg-white shadow dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        <Share2 size={16} />
      </button>
      <DownloadButton
        fileId={item.uid}
        fileName={item.name}
        getDownloadDetails={onDownload}
        className="p-2 rounded-md bg-white/80 hover:bg-white shadow dark:bg-slate-800 dark:hover:bg-slate-700"
      />

      {/* <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload(item);
        }}
        title="Descargar"
        aria-label="Descargar"
        className="p-1.5 rounded-md bg-white/80 hover:bg-white shadow dark:bg-slate-800 dark:hover:bg-slate-700"
      > */}
      {/* <Download size={16} /> */}
      {/* {isDownloading ? (
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        ) : (
          <Download className="w-4 h-4" />
        )} */}
      {/* </button> */}
    </div>
  );
}
