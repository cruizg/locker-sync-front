'use client'

import { X, Copy, Link } from 'lucide-react'
import { useEffect } from 'react'

type Props = {
  open: boolean
  item: any | null
  onClose: () => void
}

export function ShareModal({ open, item, onClose }: Props) {
  if (!open || !item) return null

  const shareUrl = item.path // luego será un link firmado

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    console.log('Link copiado:', shareUrl)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl shadow-lg p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Compartir</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Info */}
        <p className="text-sm text-zinc-500 mb-3 truncate">
          {item.name}
        </p>

        {/* Link */}
        <div className="flex items-center gap-2 border rounded-lg p-2">
          <Link size={16} className="text-zinc-400" />
          <input
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button
            onClick={copyLink}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-slate-800"
          >
            <Copy size={16} />
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-slate-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}