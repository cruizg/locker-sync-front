export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <img
      src="/imgs/FilesNotFound.png"
      alt="Carpeta vacía"
      className="w-64 opacity-80 mb-4"
    />
    <p className="text-sm text-zinc-500">
      No hay archivos en esta carpeta
    </p>
  </div>
);