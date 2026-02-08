'use client'

import { Share2, Download } from 'lucide-react'

type Props = {
  item: any
  layout: 'grid' | 'list'
  onShare: (item: any) => void
  onDownload: (item: any) => void
}

export function ActionBar({ item, layout, onShare, onDownload }: Props) {
  return (
    <div
      className={`
        ${layout === 'grid'
          ? 'absolute top-2 right-2'
          : 'ml-auto'}
        flex gap-1 opacity-0 group-hover:opacity-100 transition
      `}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onShare(item)
        }}
        title="Compartir"
        aria-label="Compartir"
        className="p-1.5 rounded-md bg-white/80 hover:bg-white shadow dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        <Share2 size={16} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onDownload(item)
        }}
        title="Descargar"
        aria-label="Descargar"
        className="p-1.5 rounded-md bg-white/80 hover:bg-white shadow dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        <Download size={16} />
      </button>
    </div>
  )
}