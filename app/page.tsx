// このコンポーネントは中国語学習アプリのメインページを表示します。
// クライアントコンポーネントとして実装し、ユーザーが日本語のフレーズを入力し、中国語の翻訳を取得できます。

'use client'

import { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import TranslationResult from '../components/TranslationResult'

export default function Home() {
  const [inputPhrase, setInputPhrase] = useState('')
  const { translationData, isLoading, error, translatePhrase } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await translatePhrase(inputPhrase)
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">中国語学習アプリ</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={inputPhrase}
          onChange={(e) => setInputPhrase(e.target.value)}
          placeholder="日本語のフレーズを入力"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          翻訳
        </button>
      </form>
      {isLoading && <p>翻訳中...</p>}
      {error && <p className="text-red-500">エラー: {error}</p>}
      {translationData && <TranslationResult data={translationData} />}
    </main>
  )
}