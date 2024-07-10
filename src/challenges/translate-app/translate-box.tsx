import useCustomSelect from './hooks/use-custom-select'
import styles from './translate-app.module.css'
import SwapTranslationIcon from './assets/Horizontal_top_left_main.svg'
import SoundIcon from './assets/sound_max_fill.svg'
import CopyIcon from './assets/Copy.svg'
import TranslateIcon from './assets/Sort_alfa.svg'

type TranslateBoxProps = {
  mainBox?: boolean
  language: string
  setLanguage: (language: string) => void
  swap: () => void
  value: string
  setValue: (value: string) => void
  translate?: (text: string) => void
  characterCount?: number
}

export default function TranslateBox({
  mainBox,
  language,
  setLanguage,
  swap,
  value,
  setValue,
  translate,
  characterCount,
}: TranslateBoxProps) {
  const { CustomSelect, setOpen } = useCustomSelect(
    [
      { label: 'Spanish', value: 'es' },
      { label: 'German', value: 'de' },
      { label: 'Portuguese', value: 'pt' },
    ],
    language,
    setLanguage
  )

  function closeSelect() {
    setOpen(false)
  }

  function handleChange(e: React.BaseSyntheticEvent) {
    if (e.target.value.length <= 500) {
      setValue(e.target.value)
    }
  }

  function translateText() {
    if (translate) {
      translate(value)
    }
  }

  function handleSound() {
    const message = new SpeechSynthesisUtterance(value)
    message.lang = language
    speechSynthesis.speak(message)
  }

  function handleCopy() {
    navigator.clipboard.writeText(value)
  }

  return (
    <div
      className={`${styles.translateContainer} ${
        !mainBox ? styles.rightContainer : ''
      }`}
      onClick={closeSelect}
    >
      <header className={styles.languageHeader}>
        <ul className={styles.defaultLanguages}>
          {mainBox && (
            <li className={styles.languageItem}>
              <button
                className={`${styles.languageButton} ${styles.detectButton}`}
              >
                Detect Language
              </button>
            </li>
          )}
          <li className={styles.languageItem}>
            <button
              className={`${styles.languageButton} ${
                language === 'en' ? styles.active : ''
              }`}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
          </li>
          <li className={styles.languageItem}>
            <button
              className={`${styles.languageButton} ${
                language === 'fr' ? styles.active : ''
              }`}
              onClick={() => setLanguage('fr')}
            >
              French
            </button>
          </li>
          <CustomSelect />
          {!mainBox && (
            <button
              className={`${styles.actionBtn} ${styles.swapBtn}`}
              onClick={swap}
            >
              <SwapTranslationIcon />
            </button>
          )}
        </ul>
      </header>
      <div className={styles.languageContent}>
        <textarea
          onChange={handleChange}
          className={styles.languageText}
          name=""
          id=""
          value={value}
        ></textarea>
      </div>
      <footer className={styles.languageFooter}>
        {mainBox && (
          <p className={styles.characterCount}>{characterCount}/500</p>
        )}
        <div
          className={`${styles.languageActions} ${
            mainBox ? styles.mainBox : ''
          }`}
        >
          <div className={styles.secondaryActions}>
            <button className={styles.actionBtn} onClick={handleSound}>
              <SoundIcon />
            </button>
            <button className={styles.actionBtn} onClick={handleCopy}>
              <CopyIcon />
            </button>
          </div>
          {mainBox && (
            <button className={styles.translateButton} onClick={translateText}>
              <TranslateIcon />
              Translate
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
