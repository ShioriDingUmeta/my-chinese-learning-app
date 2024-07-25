// このAPIルートは、OpenAI APIを使用して日本語から中国語への翻訳を行います。
// 翻訳結果をJSON形式で返します。

import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  const { japanesePhrase } = await request.json()

  if (!japanesePhrase) {
    return NextResponse.json({ error: 'Japanese phrase is required' }, { status: 400 })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0,
      messages: [
        {
          role: "system",
          content: "You are a Chinese language teacher. Translate the given Japanese phrase to Chinese. Provide the translation in pinyin, list the main words, and provide a detailed explanation of the grammar and vocabulary in Japanese. The output should be a JSON object with the following keys: 'japanese_phrase', 'chinese_phrase', 'pinyin', 'explanation', and 'main_words'. Each entry in 'main_words' should have the keys 'chinese_words', 'japanese_words', and 'pinyin'."
        },
        {
          role: "user",
          content: japanesePhrase
        }
      ]
    })

    const translationData = JSON.parse(completion.choices[0].message.content || '{}')
    return NextResponse.json(translationData)
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}