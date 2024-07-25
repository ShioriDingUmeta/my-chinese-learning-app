// このコンポーネントは翻訳結果を表示します。
// 中国語のフレーズ、ピンイン、説明、主要な単語を含みます。

import React from 'react'

interface TranslationData {
  japanese_phrase: string
  chinese_phrase: string
  pinyin: string
  explanation: string
  main_words: Array<{
    chinese_words: string
    japanese_words: string
    pinyin: string
  }>
}

interface Props {
  data: TranslationData
}

const TranslationResult: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-bold mb-2">翻訳結果</h2>
      <p><strong>日本語:</strong> {data.japanese_phrase}</p>
      <p><strong>中国語:</strong> {data.chinese_phrase}</p>
      <p><strong>ピンイン:</strong> {data.pinyin}</p>
      <h3 className="font-bold mt-2">説明:</h3>
      <p>{data.explanation}</p>
      <h3 className="font-bold mt-2">主要な単語:</h3>
      <ul>
        {data.main_words.map((word, index) => (
          <li key={index}>
            {word.chinese_words} ({word.pinyin}) - {word.japanese_words}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TranslationResult