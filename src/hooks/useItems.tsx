import { useState, useEffect } from "react";
import { getPaginatedItems } from "@/actions";

// interface PaginatedResponse<T> {
//     items: T[];
//     hasMore: boolean; // Ajusta según lo que devuelva tu API
// }

const useItems = <T,>(initialPage: number, path: any) => {
  const [page, setPage] = useState<number>(initialPage);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalSize, setTotalSize] = useState<number>(0);
  // Effect to reset state when path changes (i.e., navigating to a new folder)
  useEffect(() => {
    setPage(initialPage);
    // setItems([]); // Removed to avoid clearing existing items immediately
    setHasMore(true);
    setTotalSize(0); 
  }, [path, initialPage]); // Depend on path and initialPage

  useEffect(() => {
    if (!hasMore) {
      setLoading(false);
      return;
    }
    const fetchItems = async () => {
      //   if (page === 1 && isFirstPageLoaded) {
      //     return; // Evita cargar la página 1 más de una vez
      //   }
      try {
        setLoading(true);
        const data: any = await getPaginatedItems(page, path);
        console.log("dataaa", data.items);
        if (typeof data.items.totalSize === "number") {
          setTotalSize(data.items.totalSize);
        }
        if (page > 1) {
          setItems((prevItems) => [...prevItems, ...data.items.items]);
        } else {
          setItems(data.items.items);
        }
        if (!data.items.items || data.items.items.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [page, path]);

  const loadNextPage = () => {
    if (!loading && hasMore) {
      console.log("Cargando siguiente página:", page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const refresh = () => {
    setPage(initialPage);
    // setItems([]); // Removed to avoid clearing existing items immediately
    setHasMore(true); // Reset hasMore to true when refreshing
  };

  return { items, loading, loadNextPage, hasMore, refresh,totalSize };
};

export default useItems;
