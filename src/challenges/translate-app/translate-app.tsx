import { useState, useEffect, useCallback } from 'react'
import Background from '../../components/background'
import styles from './translate-app.module.css'
import TranslateLogo from './assets/logo.svg'
import TranslateBox from './translate-box'

export default function TranslateApp() {
  const [firstLanguage, setFirstLanguage] = useState('en')
  const [secondLanguage, setSecondLanguage] = useState('fr')
  const [valueLeft, setValueLeft] = useState('')
  const [valueRight, setValueRight] = useState('')
  const [characterCount, setCharacterCount] = useState(0)

  const translate = useCallback(
    async (text: string) => {
      const languages = `${firstLanguage}|${secondLanguage}`
      const baseUrl = 'https://api.mymemory.translated.net'
      const response = await fetch(`${baseUrl}?q=${text}&langpair=${languages}`)
      const result = await response.json()
      const { translatedText } = result.responseData

      setValueLeft(text)
      setValueRight(translatedText)
    },
    [firstLanguage, secondLanguage]
  )

  useEffect(() => {
    translate('Hello, how are you?')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setCharacterCount(valueLeft.length)
  }, [valueLeft])

  function swapLanguages() {
    setFirstLanguage(secondLanguage)
    setSecondLanguage(firstLanguage)
    setValueLeft(valueRight)
    setValueRight(valueLeft)
  }

  return (
    <Background customClass={styles.translateAppBackground}>
      <section className={styles.container}>
        <span className={styles.logo}>
          <TranslateLogo />
        </span>
        <div className={styles.fields}>
          <TranslateBox
            mainBox={true}
            language={firstLanguage}
            setLanguage={setFirstLanguage}
            swap={swapLanguages}
            value={valueLeft}
            setValue={setValueLeft}
            translate={translate}
            characterCount={characterCount}
          />
          <TranslateBox
            language={secondLanguage}
            setLanguage={setSecondLanguage}
            swap={swapLanguages}
            value={valueRight}
            setValue={setValueRight}
          />
        </div>
      </section>
    </Background>
  )
}
