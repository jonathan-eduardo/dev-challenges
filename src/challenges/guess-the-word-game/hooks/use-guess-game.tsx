import { useCallback, useEffect, useState } from 'react'
import data from '../words.json'

export default function useGuessTheWordGame() {
  const [words, setWords] = useState<string[]>([])
  const [word, setWord] = useState<string[]>([])
  const [scrambledWord, setScrambledWord] = useState<string>('')
  const [mistakes, setMistakes] = useState<string[]>([])
  const [corrects, setCorrects] = useState<string[]>([])

  const scrambleWord = useCallback((splittedWord: string[]) => {
    const newWord = [...splittedWord].sort(() => Math.random() - 0.5).join('')
    if (newWord === splittedWord.join('')) return scrambleWord(splittedWord)
    setScrambledWord(newWord)
  }, [])

  const updateWord = useCallback(
    (reset: boolean) => {
      if (reset) setMistakes([])
      setCorrects([])

      const randomIndex = Math.floor(Math.random() * words.length)
      const randomWord = words[randomIndex]

      if (randomWord) {
        setWord(randomWord.split(''))
        scrambleWord(randomWord.split(''))
      }
    },
    [words, scrambleWord]
  )

  useEffect(() => {
    setWords(data.words)
    updateWord(false)
  }, [updateWord])

  useEffect(() => {
    if (mistakes.length > 5) {
      alert(`You've lost the game, the word was: "${word.join('')}"`)
      updateWord(true)
    }
  }, [mistakes, updateWord, word])

  useEffect(() => {
    const hasWon = corrects.join('') === word.join('')
    if (word.length && hasWon) {
      alert('🎉 Success')
      updateWord(true)
    }
  }, [corrects, word, updateWord])

  function updateCorrects(value: string, index: number) {
    setCorrects((prevCorrects) => {
      const newCorrects = [...prevCorrects]
      newCorrects[index] = value.toLowerCase()
      return newCorrects
    })
  }

  return {
    word,
    scrambledWord,
    mistakes,
    updateWord,
    updateCorrects,
    setMistakes,
  }
}
