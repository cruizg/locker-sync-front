// import { useAppSelector } from '@/store/store'
"use client";
import useFileStore from "@/store/ui/ui-file";
import FileLayout from "./FileLayout";

const StickyHeader = () => {
  // const { layoutType } = useAppSelector((state) => state.settings)
  const layoutType = useFileStore((state) => state.layoutType);

  return (
    <div className="p-2 sticky top-0 z-10 pt-4 pb-2 mb-2 bg-white dark:bg-dashboard-dark">
      <div className="flex justify-between">
        <h1 className="text-2xl"></h1>
        <FileLayout />
      </div>
      {layoutType === "list" && (
        <div className="hidden md:grid grid-cols-[minmax(280px,1fr)_120px_180px_48px] px-6 py-2 text-xs font-medium text-zinc-500 dark:text-slate-400 border-b">
          <span>Nombre</span>
          <span className="text-right">Tamaño</span>
          <span className="text-right">Modificado</span>
          <span />
        </div>
      )}
    </div>
  );
};

export default StickyHeader;
