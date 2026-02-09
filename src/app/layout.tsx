import type { Metadata } from 'next'
import './globals.css'

import { inter } from '@/config/fonts';
import { Provider } from '@/components';
import { DownloadManager } from '@/components/ui/download-manager/download-manager';


// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Process | Files',
  description: 'Procesado de archivos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
          <DownloadManager />
        </Provider>
      </body>
    </html>
  )
}
