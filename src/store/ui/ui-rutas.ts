import { create } from "zustand";

type BreadcrumbItem = {
  href: string;
  label: string;
};

type BreadcrumbStore = {
  breadcrumbs: BreadcrumbItem[];
  addBreadcrumb: (item: BreadcrumbItem) => void;
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  resetBreadcrumbs: () => void;
};

export const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
  breadcrumbs: [{ href: "/", label: "Home" }], // Breadcrumb inicial
  addBreadcrumb: (item) =>
    set((state) => ({ breadcrumbs: [...state.breadcrumbs, item] })),
  setBreadcrumbs: (items) => set({ breadcrumbs: items }),
  resetBreadcrumbs: () =>
    set(() => ({ breadcrumbs: [{ href: "/", label: "Home" }] })),
}));
