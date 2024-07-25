// このコンポーネントはアプリケーション全体のレイアウトを定義します。
// メタデータの設定やグローバルスタイルの適用を行います。

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '中国語学習アプリ',
  description: '日本語から中国語への翻訳と学習をサポートするアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}