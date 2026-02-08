'use client'

import FileManagerClientPage from "../../FileManagerClientPage";

// import FileManagerClientPage from '../FileManagerClientPage'; // Import the client component

interface Props {
  params: {
    slug: string
  }
}

export default function FolderPage({ params }: Props) {
  // The FileManagerClientPage will handle fetching and displaying items based on the context path
  // which is derived from the URL's slug.
  return (
    <FileManagerClientPage />
  );
}