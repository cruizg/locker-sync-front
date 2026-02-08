"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  AppSidebar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components";
import { useBreadcrumbStore } from "@/store/ui/ui-rutas";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { getItemName } from "@/actions/item/get-item-name";
import { FileManagerProvider } from "@/contexts/FileManagerContext"; // Import FileManagerProvider
import { UploadDialog } from "@/components/ui/upload-dialog/upload-dialog"; // Import UploadDialog
import { UploadManager } from "@/components/ui/upload-manager/upload-manager"; // Import UploadManager

export default function ShopLayoutClient({
  children,
  cliente,
}: {
  children: React.ReactNode;
  cliente: any;
}) {
  const breadcrumbs = useBreadcrumbStore((state) => state.breadcrumbs);
  const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs);
  const pathname = usePathname();
  const [itemNames, setItemNames] = useState<Record<string, string>>({}); // Cache for fetched item names

  // Determine the path for FileManagerProvider
  const fileManagerPath = pathname.startsWith("/folders/")
    ? pathname.split("/")[2] // Extract the slug/id after /folders/
    : "/"; // Default to root
  function collapseBreadcrumbs(
    items: { href: string; label: string }[],
    maxVisible = 4,
  ) {
    if (items.length <= maxVisible) return items;

    return [
      items[0], // Home
      { href: "", label: "..." },
      ...items.slice(items.length - (maxVisible - 2)),
    ];
  }
  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean); // Filter out empty strings
    // console.log({ pathSegments });
    const buildBreadcrumbs = async () => {
      const newBreadcrumbs = [{ href: "/", label: "Home" }];
    //   let currentPathAccumulated = ""; // This will build up the full path

    //   for (let i = 0; i < pathSegments.length; i++) {
    //     const segment = pathSegments[i];

    //     if (segment === "folders") {
    //       // Include 'folders' in the accumulated path for correct hrefs, but skip it as a label
    //       currentPathAccumulated += `/${segment}`;
    //       continue;
    //     }

    //     currentPathAccumulated += `/${segment}`;
    //     let label = segment.charAt(0).toUpperCase() + segment.slice(1);

    //     // If it's a potential ID, try to fetch its name (assuming IDs are typically longer than simple words)
    //     // Also, check if the segment could be a numerical ID and if we haven't already fetched its name
    //     if (
    //       !isNaN(parseInt(segment, 10)) &&
    //       segment.length > 5 &&
    //       !itemNames[segment]
    //     ) {
    //       const name = await getItemName(segment);
    //       console.log({ name, segment });
    //       if (name) {
    //         label = name;
    //         // Update local cache for immediate display within this render cycle and next renders
    //         setItemNames((prev) => ({ ...prev, [segment]: name }));
    //       }
    //     } else if (itemNames[segment]) {
    //       // Use cached name if available
    //       label = itemNames[segment];
    //     }

    //     newBreadcrumbs.push({ href: currentPathAccumulated, label });
    //   }
      setBreadcrumbs(newBreadcrumbs);
    };

    buildBreadcrumbs();
  }, [pathname, setBreadcrumbs]); // itemNames removed from dependencies to prevent infinite loop.

  return (
    <SidebarProvider>
      <FileManagerProvider key={fileManagerPath} path={fileManagerPath}>
        <AppSidebar cliente={cliente.cliente} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Breadcrumb>
                <BreadcrumbList>
                  {collapseBreadcrumbs(breadcrumbs).map((item, index) => (
                    <Fragment key={item.href}>
                      <BreadcrumbItem>
                        <BreadcrumbLink href={item.href}>
                          {item.label}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && <span>/</span>}
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>{" "}
          {/* Wrap children with FileManagerProvider */}
          {children}
          <UploadDialog /> {/* Render UploadDialog here */}
          <UploadManager /> {/* Render UploadManager here */}
        </SidebarInset>
      </FileManagerProvider>
    </SidebarProvider>
  );
}
