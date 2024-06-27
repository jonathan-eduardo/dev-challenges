import Background from '../../components/background'
import styles from './random-quote.module.css'
import CopyIcon from '../images/link.svg'
import RandomIcon from '../images/Regroup.svg'
import { useEffect, useState } from 'react'

const url = 'https://api.quotable.io/quotes/random'

type Quote = {
  _id: string
  author: string
  content: string
  tags: string[]
}

export default function RandomQuote() {
  const [quote, setQuote] = useState<Quote>()
  const [loading, setLoading] = useState<boolean>(false)

  async function fetchQuote(url: string) {
    try {
      setLoading(true)
      const response = await fetch(url)
      const quoteJson: Quote[] = await response.json()

      setQuote(quoteJson[0])
    } catch (error) {
      throw new Error('Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote(url)
  }, [])

  function getRandomQuote() {
    fetchQuote(url)
  }

  function copyToClipboard() {
    if (quote?.content) navigator.clipboard.writeText(quote?.content)
  }

  return (
    <Background customClass={`${styles.randomQuoteBackground}`}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h1 className={styles.author}>{quote && quote.author}</h1>
          <div className={styles.tags}>
            {quote &&
              quote.tags.map((tag) => (
                <p key={tag} className={styles.tag}>
                  {tag}
                </p>
              ))}
          </div>
          {loading ? (
            <p className={styles.quote}>Loading...</p>
          ) : (
            <p className={styles.quote}>“{quote && quote.content}”</p>
          )}
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.btn}
            title="Get a new Quote"
            onClick={getRandomQuote}
          >
            <RandomIcon />
          </button>
          <span className={styles.separator}></span>
          <button
            className={styles.btn}
            title="Copy quote to clipboard"
            onClick={copyToClipboard}
          >
            <CopyIcon />
          </button>
        </div>
      </div>
    </Background>
  )
}
