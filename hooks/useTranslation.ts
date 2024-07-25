import { useState } from 'react'
import { supabase } from '../lib/supabase'

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

export const useTranslation = () => {
  const [translationData, setTranslationData] = useState<TranslationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const saveTranslation = async (data: TranslationData) => {
    try {
      // phrases テーブルにデータを挿入
      const { data: phraseData, error: phraseError } = await supabase
        .from('phrases')
        .insert({
          japanese_phrase: data.japanese_phrase,
          chinese_phrase: data.chinese_phrase,
          pinyin: data.pinyin,
          explanation: data.explanation
        })
        .select()

      if (phraseError) throw phraseError

      const phraseId = phraseData[0].id

      // words テーブルにデータを挿入
      for (const word of data.main_words) {
        const { error: wordError } = await supabase
          .from('words')
          .insert({
            chinese_word: word.chinese_words,
            japanese_word: word.japanese_words,
            pinyin: word.pinyin,
            phrase_id: phraseId
          })

        if (wordError) throw wordError
      }

      console.log('Translation saved successfully')
    } catch (error) {
      console.error('Error saving translation:', error)
    }
  }

  const translatePhrase = async (japanesePhrase: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ japanesePhrase }),
      })

      if (!response.ok) {
        throw new Error('翻訳に失敗しました')
      }

      const data = await response.json()
      setTranslationData(data)
      await saveTranslation(data)  // 翻訳データを保存
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知のエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return { translationData, isLoading, error, translatePhrase }
}